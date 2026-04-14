'use strict';
// ============================================================
// SHARE.JS — Partage Instagram/Facebook + écran victoire
// ============================================================

function showVictory() {
  const score = QUESTIONS.filter(q => isCorrect(q.id)).length;
  document.getElementById('victory-score').textContent = `${score} / 17`;
  showScreen('screen-victory');

  if (typeof confetti === 'function') {
    const end    = Date.now() + 4000;
    const colors = ['#D4AF37','#4A8C5C','#8FBA9F','#F7F4EE'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60,  spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
}

function generateShareImage() {
  const score = QUESTIONS.filter(q => isCorrect(q.id)).length;
  const canvas = document.createElement('canvas');
  canvas.width  = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Fond
  ctx.fillStyle = '#1A3A2A';
  ctx.fillRect(0, 0, 1080, 1080);

  // Bordure dorée
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth   = 12;
  ctx.strokeRect(30, 30, 1020, 1020);

  // Motif feuilles décoratives
  ctx.fillStyle = 'rgba(45,90,61,0.4)';
  for (let i = 0; i < 8; i++) {
    const x = 80 + i * 130;
    const y = 900 + Math.sin(i) * 20;
    ctx.beginPath();
    ctx.ellipse(x, y, 40, 20, Math.PI/4, 0, Math.PI*2);
    ctx.fill();
  }

  // Titre
  ctx.fillStyle    = '#D4AF37';
  ctx.font         = 'bold 52px Georgia, serif';
  ctx.textAlign    = 'center';
  ctx.fillText('Challenge des Experts', 540, 160);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font      = '32px Georgia, serif';
  ctx.fillText('Labyrinthe En-Champ-Thé', 540, 220);

  // Ligne séparatrice
  ctx.strokeStyle = 'rgba(212,175,55,0.4)';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.moveTo(150, 260); ctx.lineTo(930, 260); ctx.stroke();

  // Médaille emoji simulé
  ctx.font      = '120px serif';
  ctx.fillStyle = '#D4AF37';
  ctx.fillText('🏅', 540, 420);

  // Score
  ctx.fillStyle = '#FFFFFF';
  ctx.font      = 'bold 110px Georgia, serif';
  ctx.fillText(`${score}`, 440, 570);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font      = '70px Georgia, serif';
  ctx.fillText(`/ 17`, 620, 570);

  ctx.fillStyle = '#8FBA9F';
  ctx.font      = '36px Georgia, serif';
  ctx.fillText('questions réussies', 540, 640);

  // Message CTA
  ctx.fillStyle = '#D4AF37';
  ctx.font      = 'italic 38px Georgia, serif';
  ctx.fillText('Et toi, tu relèves le défi ?', 540, 740);

  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font      = '30px Georgia, serif';
  ctx.fillText('Viens découvrir les mots secrets...', 540, 800);
  ctx.fillText('On t\'attend ! 🍃', 540, 848);

  // Adresse
  ctx.fillStyle = 'rgba(143,186,159,0.8)';
  ctx.font      = '26px Georgia, serif';
  ctx.fillText('📍 Grand-Coude · La Réunion', 540, 940);

  return canvas;
}

async function shareResult() {
  const score = QUESTIONS.filter(q => isCorrect(q.id)).length;
  const text  = `🍃 Je viens de terminer le Challenge des Experts du Labyrinthe En-Champ-Thé à La Réunion !\n\nScore : ${score}/17 questions réussies ✓\n\nEt toi, tu relèves le défi ? Viens découvrir les mots secrets... On t'attend ! 🍃\n\n📍 Grand-Coude · La Réunion`;

  // Essai partage avec image
  try {
    const canvas = generateShareImage();
    const blob   = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const file   = new File([blob], 'challenge-experts-score.png', { type: 'image/png' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text });
      return;
    }
  } catch(e) { console.warn('Partage image impossible:', e); }

  // Fallback : partage texte
  try {
    if (navigator.share) {
      await navigator.share({ text });
      return;
    }
  } catch(e) {}

  // Fallback final : copier + proposer liens
  showShareModal(text, score);
}

function showShareModal(text, score) {
  // Créer une modale de partage simple
  const existing = document.getElementById('share-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'share-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;padding:1rem;';

  const card = document.createElement('div');
  card.style.cssText = 'background:#F7F4EE;border-radius:12px;padding:1.5rem;max-width:400px;width:100%;color:#1A3A2A;text-align:center;';
  card.innerHTML = `
    <h3 style="font-family:Georgia,serif;color:#1A3A2A;margin-bottom:0.75rem;">Partager ma réussite</h3>
    <p style="font-size:0.85rem;color:#4A8C5C;margin-bottom:1rem;">Copiez ce texte et partagez-le !</p>
    <textarea readonly style="width:100%;height:120px;border:1px solid #2D5A3D;border-radius:8px;padding:0.75rem;font-size:0.82rem;resize:none;background:#f5f5f0;color:#1A3A2A;">${text}</textarea>
    <div style="display:flex;gap:0.75rem;margin-top:1rem;justify-content:center;flex-wrap:wrap;">
      <button id="btn-copy-share" style="background:#D4AF37;color:#1A3A2A;border:none;border-radius:50px;padding:0.6rem 1.5rem;font-weight:700;cursor:pointer;font-size:0.9rem;">📋 Copier</button>
      <a href="https://www.facebook.com/sharer/sharer.php?u=https://labyrinthe-en-champ-the.github.io/challenge-des-experts" target="_blank" style="background:#1877F2;color:white;border:none;border-radius:50px;padding:0.6rem 1.5rem;font-weight:700;cursor:pointer;font-size:0.9rem;text-decoration:none;display:flex;align-items:center;">Facebook</a>
      <button id="btn-close-share" style="background:transparent;color:#4A8C5C;border:1px solid #4A8C5C;border-radius:50px;padding:0.6rem 1.25rem;cursor:pointer;font-size:0.9rem;">Fermer</button>
    </div>`;

  modal.appendChild(card);
  document.body.appendChild(modal);

  document.getElementById('btn-copy-share').addEventListener('click', () => {
    navigator.clipboard?.writeText(text).then(() => {
      document.getElementById('btn-copy-share').textContent = '✓ Copié !';
    }).catch(() => { alert('Texte copié manuellement depuis la zone de texte.'); });
  });
  document.getElementById('btn-close-share').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

// ---- Événements ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-share-result')?.addEventListener('click', shareResult);
  document.getElementById('btn-share-victory')?.addEventListener('click', shareResult);
  document.getElementById('btn-restart-victory')?.addEventListener('click', resetGame);
});
