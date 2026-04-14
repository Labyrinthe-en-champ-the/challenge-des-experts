'use strict';
// ============================================================
// DRAGDROP.JS — Puzzle lettres glisser-déposer
// ============================================================

const WORDS = ['PATRIMOINE', 'TERROIR'];

function buildDragDrop(correctCount) {
  // Récupérer les lettres correctement débloquées
  const earnedLetters = [];
  WORD_LAYOUT.forEach(l => {
    if (isCorrect(l.questionId)) earnedLetters.push({ char: l.char, questionId: l.questionId, wordIndex: l.wordIndex, posInWord: l.posInWord });
  });

  const pool     = document.getElementById('letters-pool');
  const targets  = document.getElementById('words-targets');
  const subtitle = document.getElementById('dragdrop-subtitle');
  const section  = document.querySelector('.dragdrop-section');

  if (!pool || !targets) return;

  pool.innerHTML = '';
  targets.innerHTML = '';

  if (earnedLetters.length === 0) {
    if (section) section.innerHTML = `<p style="text-align:center;color:var(--sprout);font-size:0.9rem;font-style:italic;">Répondez correctement aux questions pour débloquer des lettres à assembler !</p>`;
    return;
  }

  subtitle.textContent = `Vous avez débloqué ${earnedLetters.length} lettre${earnedLetters.length > 1 ? 's' : ''} sur 17. Glissez-les dans les cases pour former les mots secrets !`;

  // Mélanger les lettres gagnées
  const shuffled = [...earnedLetters].sort(() => Math.random() - 0.5);

  // Créer les lettres draggables
  shuffled.forEach((l, i) => {
    const el = document.createElement('div');
    el.classList.add('drag-letter');
    el.textContent = l.char;
    el.dataset.char = l.char;
    el.dataset.index = i;
    el.setAttribute('draggable', 'true');
    el.setAttribute('aria-label', `Lettre ${l.char}`);

    // Desktop drag
    el.addEventListener('dragstart', onDragStart);
    el.addEventListener('dragend',   onDragEnd);

    // Mobile touch
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove',  onTouchMove,  { passive: false });
    el.addEventListener('touchend',   onTouchEnd);

    pool.appendChild(el);
  });

  // Créer les slots cibles
  WORDS.forEach((word, wi) => {
    const row = document.createElement('div');
    row.className = 'word-target-row';

    const label = document.createElement('div');
    label.className = 'word-target-label';
    label.textContent = wi === 0 ? 'Premier mot (10 lettres)' : 'Deuxième mot (7 lettres)';

    const slots = document.createElement('div');
    slots.className = 'word-slots';
    slots.dataset.wordIndex = wi;

    for (let i = 0; i < word.length; i++) {
      const slot = document.createElement('div');
      slot.classList.add('drop-slot');
      slot.dataset.wordIndex = wi;
      slot.dataset.pos = i;
      slot.setAttribute('aria-label', `Case ${i+1} du ${wi === 0 ? 'premier' : 'deuxième'} mot`);

      // Desktop drop
      slot.addEventListener('dragover', onDragOver);
      slot.addEventListener('dragleave', onDragLeave);
      slot.addEventListener('drop', onDrop);

      // Click pour retirer
      slot.addEventListener('click', onSlotClick);

      slots.appendChild(slot);
    }
    row.appendChild(label);
    row.appendChild(slots);
    targets.appendChild(row);
  });
}

// ---- État drag ----
let draggedEl   = null;
let draggedChar = null;

// ---- Desktop Drag & Drop ----
function onDragStart(e) {
  draggedEl   = e.target;
  draggedChar = e.target.dataset.char;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', draggedChar);
  setTimeout(() => e.target.classList.add('dragging'), 0);
}

function onDragEnd(e) {
  e.target.classList.remove('dragging');
  draggedEl = null;
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  if (!e.currentTarget.classList.contains('filled')) {
    e.currentTarget.classList.add('drag-over');
  }
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function onDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (!draggedEl || e.currentTarget.classList.contains('filled')) return;
  placeLetterInSlot(draggedEl, e.currentTarget);
}

// ---- Mobile Touch ----
let touchEl    = null;
let touchClone = null;
let touchOffX  = 0;
let touchOffY  = 0;

function onTouchStart(e) {
  e.preventDefault();
  touchEl = e.currentTarget;
  draggedChar = touchEl.dataset.char;
  const t = e.touches[0];
  const rect = touchEl.getBoundingClientRect();
  touchOffX = t.clientX - rect.left;
  touchOffY = t.clientY - rect.top;

  // Clone visuel
  touchClone = touchEl.cloneNode(true);
  touchClone.style.cssText = `position:fixed;z-index:9999;opacity:0.85;pointer-events:none;width:${rect.width}px;height:${rect.height}px;left:${rect.left}px;top:${rect.top}px;`;
  document.body.appendChild(touchClone);
  touchEl.classList.add('dragging');
}

function onTouchMove(e) {
  e.preventDefault();
  if (!touchClone) return;
  const t = e.touches[0];
  touchClone.style.left = `${t.clientX - touchOffX}px`;
  touchClone.style.top  = `${t.clientY - touchOffY}px`;

  // Highlight slot en dessous
  document.querySelectorAll('.drop-slot').forEach(s => s.classList.remove('drag-over'));
  touchClone.style.display = 'none';
  const el = document.elementFromPoint(t.clientX, t.clientY);
  touchClone.style.display = '';
  if (el?.classList.contains('drop-slot') && !el.classList.contains('filled')) {
    el.classList.add('drag-over');
  }
}

function onTouchEnd(e) {
  if (!touchEl || !touchClone) return;
  const t = e.changedTouches[0];
  touchClone.style.display = 'none';
  const el = document.elementFromPoint(t.clientX, t.clientY);
  touchClone.style.display = '';

  document.querySelectorAll('.drop-slot').forEach(s => s.classList.remove('drag-over'));

  if (el?.classList.contains('drop-slot') && !el.classList.contains('filled')) {
    placeLetterInSlot(touchEl, el);
  }

  touchEl.classList.remove('dragging');
  touchClone.remove();
  touchClone = null;
  touchEl    = null;
}

// ---- Placement ----
function placeLetterInSlot(letterEl, slot) {
  slot.textContent = letterEl.dataset.char;
  slot.classList.add('filled');
  slot.dataset.placedChar = letterEl.dataset.char;
  slot.classList.remove('correct-slot', 'wrong-slot');
  letterEl.classList.add('placed');
  draggedEl   = null;
  draggedChar = null;
}

function onSlotClick(e) {
  const slot = e.currentTarget;
  if (!slot.classList.contains('filled')) return;
  const char = slot.dataset.placedChar;
  // Remettre la lettre dans le pool
  const pool = document.getElementById('letters-pool');
  const placed = Array.from(pool.querySelectorAll('.drag-letter.placed'))
    .find(el => el.dataset.char === char && el.classList.contains('placed'));
  if (placed) placed.classList.remove('placed');
  slot.textContent = '';
  slot.classList.remove('filled', 'correct-slot', 'wrong-slot');
  delete slot.dataset.placedChar;
}

// ---- Vérification ----
function checkWords() {
  const resultEl = document.getElementById('dragdrop-result');
  let allCorrect = true;
  let allFilled  = true;

  WORDS.forEach((word, wi) => {
    const slots = document.querySelectorAll(`.drop-slot[data-word-index="${wi}"]`);
    let wordStr = '';
    slots.forEach(slot => {
      if (!slot.classList.contains('filled')) { allFilled = false; return; }
      wordStr += slot.dataset.placedChar;
    });

    if (wordStr.length === word.length) {
      slots.forEach((slot, i) => {
        const correct = slot.dataset.placedChar === word[i];
        slot.classList.toggle('correct-slot', correct);
        slot.classList.toggle('wrong-slot', !correct);
        if (!correct) allCorrect = false;
      });
    } else {
      allCorrect = false;
    }
  });

  if (!allFilled) {
    resultEl.textContent = 'Placez toutes vos lettres avant de vérifier !';
    resultEl.className   = 'dragdrop-result error';
    return;
  }

  if (allCorrect) {
    resultEl.textContent = '🎉 Bravo ! Vous avez trouvé les mots secrets ! Cliquez sur "Voir la victoire" !';
    resultEl.className   = 'dragdrop-result success';
    document.getElementById('btn-victory-go')?.classList.remove('hidden');
  } else {
    resultEl.textContent = 'Certaines lettres ne sont pas à la bonne place... Réessayez !';
    resultEl.className   = 'dragdrop-result error';
  }
}

function resetDragDrop() {
  document.querySelectorAll('.drag-letter').forEach(el => el.classList.remove('placed'));
  document.querySelectorAll('.drop-slot').forEach(slot => {
    slot.textContent = '';
    slot.classList.remove('filled', 'correct-slot', 'wrong-slot', 'drag-over');
    delete slot.dataset.placedChar;
  });
  const res = document.getElementById('dragdrop-result');
  if (res) { res.textContent = ''; res.className = 'dragdrop-result'; }
  document.getElementById('btn-victory-go')?.classList.add('hidden');
}

// ---- Événements ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-check-word')?.addEventListener('click', checkWords);
  document.getElementById('btn-reset-drag')?.addEventListener('click', resetDragDrop);
  document.getElementById('btn-victory-go')?.addEventListener('click', showVictory);
});
