'use strict';
// ============================================================
// GAME.JS — Logique principale du jeu
// ============================================================

const STORAGE_KEY = 'ect_v2_progress';

let gameState = {
  answers:  {},   // { questionId: 'P' } — lettre choisie (pas forcément bonne)
  unlocked: {},   // { questionId: true } — débloqué par QR scan
  started:  false
};

// ---- Persistance ----
function saveState()  { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState)); } catch(e) {} }
function loadState()  { try { const r = localStorage.getItem(STORAGE_KEY); if (r) gameState = { ...gameState, ...JSON.parse(r) }; } catch(e) {} }
function clearState() { try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}; gameState = { answers: {}, unlocked: {}, started: false }; }

// ---- Accesseurs ----
function isUnlocked(id)   { return !!gameState.unlocked[id]; }
function hasAnswered(id)  { return gameState.answers[id] !== undefined; }
function isCorrect(id)    { const q = QUESTIONS.find(x => x.id === id); if (!q) return false; return q.options.find(o => o.correct)?.letter === gameState.answers[id]; }
function answeredCount()  { return Object.keys(gameState.answers).length; }
function unlockedCount()  { return Object.keys(gameState.unlocked).length; }

// ---- Navigation ----
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); window.scrollTo(0, 0); }
}

// ---- URL parsing ----
function resolveAccess() {
  const p = new URLSearchParams(window.location.search);
  const access = p.get('access'), token = p.get('t'), corr = p.get('correction');
  if (corr === CORRECTION_TOKEN) return { screen: 'correction' };
  if (access === ACCESS_TOKEN)   return { screen: 'welcome' };
  if (token && QR_TOKENS[token]) return { screen: 'question', questionId: QR_TOKENS[token] };
  return { screen: 'denied' };
}

// ---- Bandes de lettres ----
function buildLetterRow(container, wordIndex) {
  container.innerHTML = '';
  WORD_LAYOUT.filter(l => l.wordIndex === wordIndex)
    .sort((a,b) => a.posInWord - b.posInWord)
    .forEach(l => {
      const box = document.createElement('div');
      box.classList.add('letter-box');
      box.dataset.questionId = l.questionId;
      box.dataset.char = l.char;
      container.appendChild(box);
    });
}

function refreshLetterBands() {
  ['welcome-word1','strip-word1'].forEach(id => { const el=document.getElementById(id); if(el) buildLetterRow(el,0); });
  ['welcome-word2','strip-word2'].forEach(id => { const el=document.getElementById(id); if(el) buildLetterRow(el,1); });
}

// ---- Grille ----
function buildQuestionGrid() {
  const grid = document.getElementById('questions-grid');
  if (!grid) return;
  grid.innerHTML = '';

  QUESTIONS.forEach(q => {
    const card = document.createElement('button');
    card.classList.add('question-card');
    card.dataset.id = q.id;

    if (hasAnswered(q.id)) {
      card.classList.add('answered');
      card.innerHTML = `<span class="card-num">${String(q.id).padStart(2,'0')}</span><span class="card-section">${q.section}</span><span class="card-check">✓</span>`;
      card.disabled = true;
    } else if (isUnlocked(q.id)) {
      card.innerHTML = `<span class="card-num">${String(q.id).padStart(2,'0')}</span><span class="card-section">${q.section}</span>`;
      card.addEventListener('click', () => openModal(q.id));
    } else {
      card.classList.add('locked');
      card.innerHTML = `<span class="card-num">${String(q.id).padStart(2,'0')}</span><span class="card-section">${q.section}</span><span class="card-scan-msg">Scannez la pancarte<br/>pour débloquer</span>`;
      card.disabled = true;
    }
    grid.appendChild(card);
  });
}

function updateProgress() {
  const count = answeredCount();
  const el = document.getElementById('progress-text');
  const fill = document.getElementById('progress-fill');
  const bar = document.querySelector('.progress-bar');
  if (el)   el.textContent = `${count} / 17`;
  if (fill) fill.style.width = `${Math.round(count/17*100)}%`;
  if (bar)  bar.setAttribute('aria-valuenow', count);
}

function updateStripPending() {
  const el = document.querySelector('.strip-pending');
  if (!el) return;
  const remaining = 17 - answeredCount();
  el.textContent = remaining > 0 ? `Répondez à toutes les questions pour révéler les lettres` : '';
}

// ---- Modal ----
let currentQuestionId = null;
let wrongAttempts = 0;
let selectedLetter = null;

function openModal(questionId) {
  const q = QUESTIONS.find(x => x.id === questionId);
  if (!q) return;
  currentQuestionId = questionId;
  wrongAttempts = 0;
  selectedLetter = null;

  document.getElementById('modal-num').textContent   = String(q.id).padStart(2,'0');
  document.getElementById('modal-title').textContent = q.section;
  document.getElementById('modal-pancarte').textContent = q.pancarte;
  document.getElementById('modal-question').textContent = q.question;

  // Illustration SVG
  const illus = document.getElementById('modal-illustration');
  if (illus && SVG_ILLUSTRATIONS[q.id]) illus.innerHTML = SVG_ILLUSTRATIONS[q.id];

  // Réinitialiser
  document.getElementById('btn-hint').classList.add('hidden');
  const hintBox = document.getElementById('hint-box');
  hintBox.classList.add('hidden'); hintBox.textContent = '';

  const confirm = document.getElementById('answer-confirm');
  confirm.classList.add('hidden');

  // Options
  const optContainer = document.getElementById('modal-options');
  optContainer.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.dataset.letter = opt.letter;
    btn.setAttribute('aria-label', `${opt.letter} / ${opt.text}`);
    btn.innerHTML = `<span class="option-letter" aria-hidden="true">${opt.letter}</span><span class="option-sep" aria-hidden="true">/</span><span class="option-text">${opt.text}</span>`;
    btn.addEventListener('click', () => selectOption(btn, opt.letter));
    optContainer.appendChild(btn);
  });

  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => document.getElementById('btn-close-modal').focus(), 100);
}

function selectOption(btn, letter) {
  // Déselectionner tout
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedLetter = letter;

  // Afficher confirmation
  const confirm = document.getElementById('answer-confirm');
  const confirmText = document.getElementById('confirm-text');
  confirmText.innerHTML = `Vous avez choisi : <strong>${letter}</strong> — Confirmer ?`;
  confirm.classList.remove('hidden');
}

function validateAnswer() {
  if (!selectedLetter || !currentQuestionId) return;
  const q = QUESTIONS.find(x => x.id === currentQuestionId);
  if (!q) return;

  // Sauvegarder la réponse (sans révéler si c'est bon)
  gameState.answers[currentQuestionId] = selectedLetter;
  saveState();

  // Marquer la carte
  updateGridCard(currentQuestionId);
  updateProgress();

  // Fermer modal
  setTimeout(closeModal, 300);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  currentQuestionId = null;
  selectedLetter = null;
}

function updateGridCard(questionId) {
  const card = document.querySelector(`.question-card[data-id="${questionId}"]`);
  if (!card) return;
  const q = QUESTIONS.find(x => x.id === questionId);
  card.classList.remove('locked');
  card.classList.add('answered');
  card.disabled = true;
  card.innerHTML = `<span class="card-num">${String(questionId).padStart(2,'0')}</span><span class="card-section">${q.section}</span><span class="card-check">✓</span>`;
}

// ---- Réinitialisation ----
function resetGame() {
  if (!confirm('Réinitialiser toute votre progression ?')) return;
  clearState();
  refreshLetterBands();
  buildQuestionGrid();
  updateProgress();
  showScreen('screen-welcome');
}

// ---- Correction screen ----
function buildCorrectionScreen() {
  const grid = document.getElementById('correction-grid');
  if (!grid) return;
  grid.innerHTML = '';
  QUESTIONS.forEach(q => {
    const correct = q.options.find(o => o.correct);
    const item = document.createElement('div');
    item.className = 'correction-item';
    item.innerHTML = `
      <div class="corr-num">${String(q.id).padStart(2,'0')}</div>
      <div class="corr-body">
        <div class="corr-question">${q.question}</div>
        <div class="corr-answer">
          <span class="corr-letter">${correct.letter}</span>
          ${correct.text}
        </div>
      </div>`;
    grid.appendChild(item);
  });
}

// ---- Init ----
function init() {
  loadState();
  const access = resolveAccess();

  if (access.screen === 'denied') { showScreen('screen-denied'); return; }

  if (access.screen === 'correction') {
    buildCorrectionScreen();
    showScreen('screen-correction');
    return;
  }

  if (access.screen === 'question') {
    const qId = access.questionId;
    gameState.unlocked[qId] = true;
    gameState.started = true;
    saveState();
    refreshLetterBands();
    buildQuestionGrid();
    updateProgress();
    showScreen('screen-game');
    if (!hasAnswered(qId)) setTimeout(() => openModal(qId), 400);
    return;
  }

  // welcome
  refreshLetterBands();
  buildQuestionGrid();
  updateProgress();
  showScreen(gameState.started && answeredCount() > 0 ? 'screen-game' : 'screen-welcome');

  // Événements
  document.getElementById('btn-close-modal')?.addEventListener('click', closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click', e => { if (e.target.id === 'modal-overlay') closeModal(); });
  document.getElementById('btn-validate-answer')?.addEventListener('click', validateAnswer);
  document.getElementById('btn-hint')?.addEventListener('click', () => {
    const q = QUESTIONS.find(x => x.id === currentQuestionId);
    if (!q) return;
    const h = document.getElementById('hint-box');
    h.textContent = q.hint; h.classList.remove('hidden');
    document.getElementById('btn-hint').classList.add('hidden');
  });
  document.getElementById('btn-finish-header')?.addEventListener('click', () => showResults());
  document.getElementById('btn-restart-top')?.addEventListener('click', resetGame);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
