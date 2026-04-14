'use strict';
// ============================================================
// RESULTS.JS — Écran résumé, scoring, affichage résultats
// ============================================================

function getMention(score) {
  if (score === 17) return "Expert absolu du Labyrinthe En-Champ-Thé ! 🏅";
  if (score >= 15)  return "Excellent ! Vous maîtrisez l'histoire du thé réunionnais.";
  if (score >= 12)  return "Très bien ! Quelques secrets du labyrinthe vous ont résisté...";
  if (score >= 8)   return "Bien ! Continuez l'exploration pour découvrir tous les secrets.";
  if (score >= 5)   return "Vous débutez votre exploration — il reste tant à découvrir !";
  return "Le labyrinthe garde encore bien ses secrets...";
}

function showResults() {
  // Calculer le score
  let correct = 0;
  QUESTIONS.forEach(q => {
    const given = gameState.answers[q.id];
    if (given && q.options.find(o => o.correct)?.letter === given) correct++;
  });

  // Score
  document.getElementById('score-value').textContent   = correct;
  document.getElementById('score-mention').textContent = getMention(correct);

  // Liste des résultats
  const list = document.getElementById('results-list');
  list.innerHTML = '';

  QUESTIONS.forEach(q => {
    const given      = gameState.answers[q.id];
    const correctOpt = q.options.find(o => o.correct);
    const givenOpt   = q.options.find(o => o.letter === given);
    const isRight    = given && correctOpt?.letter === given;
    const wasSkipped = !given;

    const item = document.createElement('div');
    item.className = `result-item ${wasSkipped ? 'skipped' : isRight ? 'correct' : 'incorrect'}`;

    const statusIcon = wasSkipped ? '⬜' : isRight ? '✅' : '❌';

    item.innerHTML = `
      <div class="result-top">
        <span class="result-num">Pancarte ${String(q.id).padStart(2,'0')}</span>
        <span class="result-status">${statusIcon}</span>
      </div>
      <div class="result-question">${q.question}</div>
      <div class="result-answer">
        <span class="result-letter ${isRight || wasSkipped ? '' : 'wrong'}">${wasSkipped ? '?' : correctOpt.letter}</span>
        ${wasSkipped ? '<em style="color:rgba(255,255,255,0.4)">Non répondue</em>' : correctOpt.text}
      </div>
      ${!isRight && !wasSkipped ? `<div style="font-size:0.78rem;color:var(--error);margin-top:0.25rem;">Votre réponse : ${givenOpt?.letter} / ${givenOpt?.text}</div>` : ''}
      <button class="anecdote-toggle" aria-expanded="false">💡 Le saviez-vous ?</button>
      <div class="result-anecdote hidden">${q.anecdote}</div>
    `;

    // Toggle anecdote
    const toggle  = item.querySelector('.anecdote-toggle');
    const anecDiv = item.querySelector('.result-anecdote');
    toggle.addEventListener('click', () => {
      const open = anecDiv.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!anecDiv.classList.contains('hidden')));
      toggle.textContent = anecDiv.classList.contains('hidden') ? '💡 Le saviez-vous ?' : '▲ Réduire';
    });

    list.appendChild(item);
  });

  // Construire la zone drag & drop
  buildDragDrop(correct);

  showScreen('screen-results');
}

// ---- Boutons résumé ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-resume-game')?.addEventListener('click', () => {
    // Débloquer les questions incorrectes (sans rescanner)
    QUESTIONS.forEach(q => {
      if (!isCorrect(q.id) && hasAnswered(q.id)) {
        // Permettre de re-répondre : effacer la mauvaise réponse
        delete gameState.answers[q.id];
      }
    });
    saveState();
    buildQuestionGrid();
    updateProgress();
    showScreen('screen-game');
  });

  document.getElementById('btn-share-result')?.addEventListener('click', shareResult);
  document.getElementById('btn-restart-results')?.addEventListener('click', resetGame);
});
