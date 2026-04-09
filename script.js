/* ============================================================
   CHALLENGE DES EXPERTS · Labyrinthe En-Champ-Thé
   script.js — Version finale sécurisée
   Tokens QR aléatoires · Images contextuelles · Logo officiel
   ============================================================ */

'use strict';

// ============================================================
// TOKEN D'ACCÈS GLOBAL (écran d'accueil)
// Ce token est dans l'URL du QR code d'entrée du labyrinthe
// ============================================================
const ACCESS_TOKEN = 'ECT-2Xk9mPqL7vR';

// ============================================================
// TABLE DES TOKENS QR PAR QUESTION
// Chaque token est unique et imprévisible
// Ces tokens sont gravés dans les QR codes des pancartes
// ============================================================
const QR_TOKENS = {
  'P8nZx2mKqL': 1,
  'Wj4rY9cNvT': 2,
  'Hd7sB3fGpX': 3,
  'Qm5tR6wJkE': 4,
  'Lv2nC8hDyU': 5,
  'Xb9pM4zFsA': 6,
  'Yk3wN7gRcI': 7,
  'Fq6xT1mHoV': 8,
  'Zn8dK5jWbS': 9,
  'Gc4vL2pXeN': 10,
  'Uh7mQ9rBwD': 11,
  'Tj3kF6nYsP': 12,
  'Rv5cH8xMaL': 13,
  'Ew2bG4tKzO': 14,
  'Ai9nJ7qWfC': 15,
  'Mo6pD3yXvB': 16,
  'Bs1wR8hNtG': 17
};

// ============================================================
// DONNÉES DES 17 QUESTIONS
// ============================================================
const QUESTIONS = [
  {
    id: 1,
    section: "Naissance du village",
    question: "Qui fut l'acteur principal de la culture du géranium à La Réunion ?",
    options: [
      { letter: "P", text: "MR Henri Boisjoli-Potier", correct: true },
      { letter: "B", text: "MR Charles Payet",         correct: false }
    ],
    hint: "Cherchez qui a initié cette culture sur ses terres au Tampon dès 1887.",
    image: "images/q1-boisjoli-potier.jpg",
    imageCaption: "Henri Boisjoli-Potier — Pionnier du géranium à La Réunion"
  },
  {
    id: 2,
    section: "Transition Géranium / Thé",
    question: "Dans quelles régions furent entreprises les premières expérimentations du thé à La Réunion ?",
    options: [
      { letter: "C", text: "Plaines des Palmiste et Grand Coude", correct: false },
      { letter: "A", text: "Bagatelle et Menciole",               correct: true }
    ],
    hint: "Lisez attentivement la pancarte — les noms de lieux sont précis.",
    image: "images/q2-bagatelle-menciole.jpg",
    imageCaption: "Bagatelle et Menciole — Premiers sites d'expérimentation du thé"
  },
  {
    id: 3,
    section: "Début de l'aventure du Thé",
    question: "Quelle est la conclusion qui ressort après examen de l'expert national en 1957 ?",
    options: [
      { letter: "T", text: "Thé de qualité et potentiel d'avenir",    correct: true },
      { letter: "G", text: "Grand rendement et facilité de culture",   correct: false }
    ],
    hint: "L'expert a rédigé ses conclusions en novembre 1957 — que disait-il des espoirs ?",
    image: "images/q3-expert-1957.jpg",
    imageCaption: "Rapport de l'expert national — Novembre 1957"
  },
  {
    id: 4,
    section: "Développement de l'aventure",
    question: "Quels étaient les objectifs de la Direction des Services Agricoles à plus long terme ?",
    options: [
      { letter: "R", text: "Mise en culture de 2 000 hectares", correct: true },
      { letter: "S", text: "Favoriser l'exportation",           correct: false }
    ],
    hint: "Le programme prévoyait un chiffre précis d'hectares à plus long terme.",
    image: "images/q4-2000-hectares.jpg",
    imageCaption: "Programme de développement — 2 000 hectares envisagés"
  },
  {
    id: 5,
    section: "Développement (suite)",
    question: "En 1959, quels étaient les deux planteurs qui entreprirent la culture du thé sur le village de Grand-Coude ?",
    options: [
      { letter: "U", text: "Benoît Mondon et Harles Henri",  correct: false },
      { letter: "I", text: "Charles Payet et Yves Mondon",   correct: true }
    ],
    hint: "Deux noms de familles emblématiques de Grand Coude sont cités sur cette pancarte.",
    image: "images/q5-payet-mondon.jpg",
    imageCaption: "Charles Payet et Yves Mondon — Pionniers du thé à Grand-Coude (1959)"
  },
  {
    id: 6,
    section: "Commercialisation du thé",
    question: "Où était valorisé le thé de Bourbon en 1960 ?",
    options: [
      { letter: "Y", text: "La Réunion", correct: false },
      { letter: "M", text: "Londres",    correct: true }
    ],
    hint: "Il s'agit d'une grande capitale européenne, siège d'une bourse de matières premières.",
    image: "images/q6-londres.jpg",
    imageCaption: "Londres — La bourse du thé où était valorisé le thé de Bourbon"
  },
  {
    id: 7,
    section: "Restructuration à Grand Coude",
    question: "Quels sont les rendements des 27 planteurs de Grand-Coude ?",
    options: [
      { letter: "O", text: "5 tonnes/hectare", correct: true },
      { letter: "B", text: "6 tonnes/hectare", correct: false }
    ],
    hint: "En 1969, ce chiffre représentait le meilleur rendement de l'île.",
    image: "images/q7-planteurs.jpg",
    imageCaption: "Les 27 planteurs de Grand-Coude — Meilleur rendement de l'île en 1969"
  },
  {
    id: 8,
    section: "Déclin et fin de l'aventure",
    question: "Quelle date signe la fin de l'aventure du thé de La Réunion par vote du Conseil Général ?",
    options: [
      { letter: "I", text: "Le 4 janvier 1972",  correct: true },
      { letter: "R", text: "Le 1er janvier 1970", correct: false }
    ],
    hint: "Une date précise est mentionnée sur la pancarte sur le déclin du thé.",
    image: "images/q8-conseil-1972.jpg",
    imageCaption: "Vote du Conseil Général — 4 janvier 1972, fin de l'aventure du thé"
  },
  {
    id: 9,
    section: "Raisons de l'échec",
    question: "Quel est le coût de revient du thé de La Réunion en 1960 et 1970 ?",
    options: [
      { letter: "N", text: "3,82 francs en 1960 / 5,62 francs en 1970", correct: true },
      { letter: "C", text: "3,82 euros en 1960 / 5,62 euros en 1970",   correct: false }
    ],
    hint: "Attention à la monnaie utilisée : nous sommes avant l'euro !",
    image: "images/q9-cout-the.jpg",
    imageCaption: "Coût de revient du thé réunionnais — Données économiques 1960-1970"
  },
  {
    id: 10,
    section: "Le Thé dans le monde",
    question: "De quel pays provient la souche de thé présente à La Réunion, soit l'Assamica ?",
    options: [
      { letter: "A", text: "Chine", correct: false },
      { letter: "E", text: "Inde",  correct: true }
    ],
    hint: "Le nom 'Assamica' fait référence à une région célèbre productrice de thé.",
    image: "images/q10-inde-assamica.jpg",
    imageCaption: "Camellia Sinensis var. Assamica — Originaire de la région d'Assam, Inde"
  },
  {
    id: 11,
    section: "Le thé au naturel",
    question: "Les théiers présents dans le labyrinthe peuvent-ils atteindre combien de mètres ?",
    options: [
      { letter: "V", text: "10 à 12 mètres", correct: false },
      { letter: "T", text: "15 à 20 mètres", correct: true }
    ],
    hint: "La pancarte précise la hauteur de la souche indienne — certains de nos théiers l'atteignent !",
    image: "images/q11-theier-hauteur.jpg",
    imageCaption: "Théiers du Labyrinthe En-Champ-Thé — Jusqu'à 15-20 mètres de hauteur"
  },
  {
    id: 12,
    section: "Le thé cultivé",
    question: "Au bout de combien d'années un théier devient-il productif ?",
    options: [
      { letter: "D", text: "2 à 3 ans", correct: false },
      { letter: "E", text: "4 à 5 ans", correct: true }
    ],
    hint: "La pancarte sur le thé cultivé donne cette information précise.",
    image: "images/q12-theier-productif.jpg",
    imageCaption: "Jeune théier — 4 à 5 ans avant la première récolte"
  },
  {
    id: 13,
    section: "Cueillir le thé",
    question: "Quelles sont les trois types de cueillettes existantes ?",
    options: [
      { letter: "R", text: "Impériale ; fine ; classique", correct: true },
      { letter: "W", text: "Royal ; fine ; basic",         correct: false }
    ],
    hint: "L'une de ces cueillettes était autrefois réservée aux empereurs...",
    image: "images/q13-cueillette.jpg",
    imageCaption: "Cueillette impériale — Le geste ancestral de la récolte fine"
  },
  {
    id: 14,
    section: "Les différentes sortes de thé",
    question: "Auparavant, quelle sorte de thé était produite par nos anciens ?",
    options: [
      { letter: "L", text: "Thé blanc et noir", correct: false },
      { letter: "R", text: "Thé noir",          correct: true }
    ],
    hint: "La note en bas de la pancarte sur les sortes de thé répond à cette question.",
    image: "images/q14-the-noir.jpg",
    imageCaption: "Thé noir — La production historique des anciens planteurs réunionnais"
  },
  {
    id: 15,
    section: "La culture du Thé relancée",
    question: "Quelles surfaces occupent aujourd'hui les tables de récolte aménagées au labyrinthe ?",
    options: [
      { letter: "O", text: "5 hectares",  correct: true },
      { letter: "I", text: "10 hectares", correct: false }
    ],
    hint: "La superficie est mentionnée en lien avec la relance de 2005.",
    image: "images/q15-labyrinthe-5ha.jpg",
    imageCaption: "Le Labyrinthe En-Champ-Thé — 5 hectares de tables de récolte"
  },
  {
    id: 16,
    section: "L'avenir de la culture",
    question: "En quelle année la culture du thé a-t-elle été reconnue administrativement comme 'plante aromatique et médicinale' ?",
    options: [
      { letter: "I", text: "2014", correct: true },
      { letter: "H", text: "2005", correct: false }
    ],
    hint: "Ce n'est pas l'année de la relance, mais une reconnaissance administrative ultérieure.",
    image: "images/q16-reconnaissance.jpg",
    imageCaption: "Reconnaissance officielle 2014 — Le thé classé plante aromatique et médicinale"
  },
  {
    id: 17,
    section: "2022 : année des Médailles",
    question: "Comment se nomme l'agence qui récompense 'les thés du monde', dont on a été primé en 2022 ?",
    options: [
      { letter: "E", text: "CITM — Concours International des Thés du Monde",          correct: false },
      { letter: "R", text: "AVPA — Agence pour la Valorisation des Productions Agricoles", correct: true }
    ],
    hint: "Le nom complet de l'agence est écrit sur la dernière pancarte.",
    image: "images/q17-medaille-avpa.jpg",
    imageCaption: "Médaille AVPA 2022 — Le thé de Grand-Coude récompensé sur la scène mondiale"
  }
];

// ============================================================
// DISPOSITION DES LETTRES — PATRIMOINE + TERROIR
// ============================================================
const WORD_LAYOUT = [
  { questionId: 1,  char: "P", wordIndex: 0, posInWord: 0 },
  { questionId: 2,  char: "A", wordIndex: 0, posInWord: 1 },
  { questionId: 3,  char: "T", wordIndex: 0, posInWord: 2 },
  { questionId: 4,  char: "R", wordIndex: 0, posInWord: 3 },
  { questionId: 5,  char: "I", wordIndex: 0, posInWord: 4 },
  { questionId: 6,  char: "M", wordIndex: 0, posInWord: 5 },
  { questionId: 7,  char: "O", wordIndex: 0, posInWord: 6 },
  { questionId: 8,  char: "I", wordIndex: 0, posInWord: 7 },
  { questionId: 9,  char: "N", wordIndex: 0, posInWord: 8 },
  { questionId: 10, char: "E", wordIndex: 0, posInWord: 9 },
  { questionId: 11, char: "T", wordIndex: 1, posInWord: 0 },
  { questionId: 12, char: "E", wordIndex: 1, posInWord: 1 },
  { questionId: 13, char: "R", wordIndex: 1, posInWord: 2 },
  { questionId: 14, char: "R", wordIndex: 1, posInWord: 3 },
  { questionId: 15, char: "O", wordIndex: 1, posInWord: 4 },
  { questionId: 16, char: "I", wordIndex: 1, posInWord: 5 },
  { questionId: 17, char: "R", wordIndex: 1, posInWord: 6 }
];

// ============================================================
// ÉTAT DU JEU
// ============================================================
const STORAGE_KEY = 'ect_v2_progress';
let gameState = { answered: {}, unlockedByQR: {}, started: false };
let currentQuestionId = null;
let wrongAttempts = 0;

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState)); } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) gameState = { ...gameState, ...JSON.parse(raw) };
  } catch(e) {}
}
function answeredCount() { return Object.keys(gameState.answered).length; }
function isAnswered(id)  { return !!gameState.answered[id]; }
function isUnlocked(id)  { return !!gameState.unlockedByQR[id]; }

// ============================================================
// VÉRIFICATION DES TOKENS DANS L'URL
// ============================================================
function checkURLTokens() {
  const params = new URLSearchParams(window.location.search);

  // 1. Token QR d'une question spécifique
  const qrToken = params.get('t');
  if (qrToken && QR_TOKENS[qrToken]) {
    const questionId = QR_TOKENS[qrToken];
    gameState.unlockedByQR[questionId] = true;
    gameState.started = true;
    saveState();
    return { type: 'question', questionId };
  }

  // 2. Token d'accès global (entrée du labyrinthe)
  const accessToken = params.get('access');
  if (accessToken === ACCESS_TOKEN) {
    gameState.started = true;
    saveState();
    return { type: 'welcome' };
  }

  // 3. Déjà commencé (progression sauvegardée)
  if (gameState.started) {
    return { type: 'resume' };
  }

  // 4. Aucun token valide
  return { type: 'blocked' };
}

// ============================================================
// CONSTRUCTION UI — BANDES DE LETTRES
// ============================================================
function buildLetterRow(container, wordIndex) {
  container.innerHTML = '';
  WORD_LAYOUT
    .filter(l => l.wordIndex === wordIndex)
    .sort((a, b) => a.posInWord - b.posInWord)
    .forEach(l => {
      const box = document.createElement('div');
      box.classList.add('letter-box');
      box.dataset.questionId = l.questionId;
      box.dataset.char = l.char;
      if (isAnswered(l.questionId)) {
        box.textContent = l.char;
        box.classList.add('revealed');
      }
      container.appendChild(box);
    });
}

function refreshLetterBands() {
  ['welcome-word1', 'strip-word1'].forEach(id => {
    const el = document.getElementById(id);
    if (el) buildLetterRow(el, 0);
  });
  ['welcome-word2', 'strip-word2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) buildLetterRow(el, 1);
  });
}

// ============================================================
// GRILLE DES QUESTIONS
// ============================================================
function buildQuestionGrid() {
  const grid = document.getElementById('questions-grid');
  grid.innerHTML = '';

  QUESTIONS.forEach(q => {
    const card = document.createElement('div');
    card.classList.add('question-card');
    card.dataset.id = q.id;

    if (isAnswered(q.id)) {
      card.classList.add('answered');
      card.innerHTML = `
        <span class="card-num">${String(q.id).padStart(2,'0')}</span>
        <span class="card-section">${q.section}</span>
        <span class="card-check" aria-hidden="true">✓</span>
      `;
    } else if (isUnlocked(q.id)) {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Question ${q.id} : ${q.section}`);
      card.innerHTML = `
        <span class="card-num">${String(q.id).padStart(2,'0')}</span>
        <span class="card-section">${q.section}</span>
      `;
      card.addEventListener('click', () => openModal(q.id));
      card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(q.id); });
    } else {
      card.classList.add('locked');
      card.setAttribute('aria-label', `Question ${q.id} verrouillée`);
      card.innerHTML = `
        <span class="card-num">${String(q.id).padStart(2,'0')}</span>
        <span class="card-section">${q.section}</span>
        <span class="card-scan-msg">Scannez la pancarte<br/>pour débloquer</span>
      `;
    }

    grid.appendChild(card);
  });
}

function updateProgress() {
  const count = answeredCount();
  const pct   = Math.round((count / 17) * 100);
  const el    = document.getElementById('progress-text');
  const fill  = document.getElementById('progress-fill');
  const bar   = document.querySelector('.progress-bar');
  if (el)   el.textContent = `${count} / 17`;
  if (fill) fill.style.width = `${pct}%`;
  if (bar)  bar.setAttribute('aria-valuenow', count);
}

// ============================================================
// MODAL
// ============================================================
function openModal(questionId) {
  const q = QUESTIONS.find(x => x.id === questionId);
  if (!q) return;

  currentQuestionId = questionId;
  wrongAttempts = 0;

  document.getElementById('modal-num').textContent      = String(q.id).padStart(2, '0');
  document.getElementById('modal-title').textContent    = q.section;
  document.getElementById('modal-question').textContent = q.question;

  const feedback = document.getElementById('modal-feedback');
  feedback.textContent = '';
  feedback.className   = 'modal-feedback';

  document.getElementById('btn-hint').classList.add('hidden');
  document.getElementById('hint-box').classList.add('hidden');
  document.getElementById('hint-box').textContent = '';
  document.getElementById('modal-image-wrap').classList.add('hidden');

  // Construire les options — style "P / Texte de l'option"
  const optionsContainer = document.getElementById('modal-options');
  optionsContainer.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.setAttribute('aria-label', `${opt.letter} / ${opt.text}`);
    btn.innerHTML = `
      <span class="option-letter" aria-hidden="true">${opt.letter}</span>
      <span class="option-slash"  aria-hidden="true">/</span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => handleAnswer(opt.correct, q));
    optionsContainer.appendChild(btn);
  });

  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => document.getElementById('btn-close-modal').focus(), 100);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-overlay').setAttribute('aria-hidden', 'true');
  currentQuestionId = null;
}

function handleAnswer(isCorrect, question) {
  const feedback  = document.getElementById('modal-feedback');
  const modalCard = document.getElementById('modal-card');

  if (isCorrect) {
    feedback.textContent = '✓ Excellente réponse ! La lettre est révélée.';
    feedback.className   = 'modal-feedback correct-msg';

    modalCard.classList.remove('wrong');
    modalCard.classList.add('correct');
    setTimeout(() => modalCard.classList.remove('correct'), 700);

    disableOptions();

    // Afficher l'image contextuelle
    const imgWrap   = document.getElementById('modal-image-wrap');
    const imgEl     = document.getElementById('modal-image');
    const captionEl = document.getElementById('modal-image-caption');
    imgEl.src             = question.image;
    imgEl.alt             = question.imageCaption;
    captionEl.textContent = question.imageCaption;
    imgWrap.classList.remove('hidden');

    // Sauvegarder
    gameState.answered[currentQuestionId] = true;
    saveState();

    // Révéler la lettre
    revealLetter(currentQuestionId);
    updateGridCard(currentQuestionId);
    updateProgress();

    // Fermer après 2,5s (plus long pour voir l'image)
    setTimeout(() => {
      closeModal();
      if (answeredCount() === 17) setTimeout(showVictory, 400);
    }, 2500);

  } else {
    wrongAttempts++;
    feedback.textContent = "✗ Ce n'est pas la bonne réponse... Relisez la pancarte !";
    feedback.className   = 'modal-feedback wrong-msg';

    modalCard.classList.remove('correct');
    modalCard.classList.add('wrong');
    setTimeout(() => modalCard.classList.remove('wrong'), 500);

    if (wrongAttempts >= 2) {
      document.getElementById('btn-hint').classList.remove('hidden');
    }
  }
}

function disableOptions() {
  document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('disabled'));
}

function revealLetter(questionId) {
  document.querySelectorAll(`.letter-box[data-question-id="${questionId}"]`).forEach(box => {
    box.textContent = box.dataset.char;
    box.classList.add('revealed');
  });
}

function updateGridCard(questionId) {
  const card = document.querySelector(`.question-card[data-id="${questionId}"]`);
  if (!card) return;
  card.classList.remove('locked');
  card.classList.add('answered');
  card.innerHTML = `
    <span class="card-num">${String(questionId).padStart(2,'0')}</span>
    <span class="card-section">${QUESTIONS.find(q => q.id === questionId).section}</span>
    <span class="card-check" aria-hidden="true">✓</span>
  `;
  const newCard = card.cloneNode(true);
  card.parentNode.replaceChild(newCard, card);
}

// ============================================================
// VICTOIRE
// ============================================================
function showVictory() {
  showScreen('screen-victory');
  if (typeof confetti === 'function') {
    const end    = Date.now() + 4500;
    const colors = ['#D4AF37', '#4A8C5C', '#8FBA9F', '#F7F4EE'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60,  spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
}

// ============================================================
// PARTAGE
// ============================================================
function shareResult() {
  const text = `🍃 Je viens de terminer le Challenge des Experts du Labyrinthe En-Champ-Thé à La Réunion !\n\nMot-clé secret découvert : PATRIMOINE et TERROIR 🏅\n\nVenez découvrir l'histoire fascinante du thé réunionnais à Grand-Coude !\n📍 Labyrinthe En-Champ-Thé · 18 rue Émile Mussard, Grand-Coude`;
  if (navigator.share) {
    navigator.share({ title: 'Challenge des Experts · Labyrinthe En-Champ-Thé', text }).catch(() => fallbackShare(text));
  } else {
    fallbackShare(text);
  }
}
function fallbackShare(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => alert('Texte copié ! Collez-le sur vos réseaux 📋')).catch(() => prompt('Copiez ce texte :', text));
  } else {
    prompt('Copiez ce texte pour partager :', text);
  }
}

// ============================================================
// NAVIGATION
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) { target.classList.add('active'); target.scrollTop = 0; }
}

// ============================================================
// RÉINITIALISATION
// ============================================================
function resetGame() {
  if (!confirm('Réinitialiser toute votre progression ?')) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  gameState = { answered: {}, unlockedByQR: {}, started: false };
  // Garder le token actuel s'il y en a un
  const params = new URLSearchParams(window.location.search);
  const qrToken = params.get('t');
  if (qrToken && QR_TOKENS[qrToken]) {
    gameState.unlockedByQR[QR_TOKENS[qrToken]] = true;
    gameState.started = true;
  }
  saveState();
  refreshLetterBands();
  buildQuestionGrid();
  updateProgress();
  showScreen('screen-game');
}

// ============================================================
// INITIALISATION
// ============================================================
function init() {
  loadState();

  const tokenResult = checkURLTokens();

  if (tokenResult.type === 'blocked') {
    showScreen('screen-blocked');
    return;
  }

  refreshLetterBands();
  buildQuestionGrid();
  updateProgress();

  if (tokenResult.type === 'question') {
    // Scan d'une pancarte → aller directement au jeu et ouvrir la question
    showScreen('screen-game');
    setTimeout(() => openModal(tokenResult.questionId), 400);
  } else if (tokenResult.type === 'welcome') {
    showScreen('screen-welcome');
  } else {
    // Resume
    showScreen('screen-game');
  }

  // Événements
  // Bouton démarrer supprimé — le visiteur commence en scannant la pancarte n°1
  document.getElementById('btn-close-modal').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.getElementById('btn-hint').addEventListener('click', () => {
    const q = QUESTIONS.find(x => x.id === currentQuestionId);
    if (!q) return;
    document.getElementById('hint-box').textContent = q.hint;
    document.getElementById('hint-box').classList.remove('hidden');
    document.getElementById('btn-hint').classList.add('hidden');
  });
  document.getElementById('btn-share').addEventListener('click', shareResult);
  document.getElementById('btn-restart-victory').addEventListener('click', resetGame);
  document.getElementById('btn-restart-grid').addEventListener('click', resetGame);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('modal-overlay').classList.contains('hidden')) closeModal();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
