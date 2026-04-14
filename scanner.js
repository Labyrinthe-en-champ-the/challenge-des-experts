'use strict';
// ============================================================
// SCANNER.JS — Scanner QR code via caméra
// ============================================================

let scannerStream   = null;
let scannerInterval = null;
let scannerActive   = false;

function openScanner() {
  const overlay = document.getElementById('scanner-overlay');
  if (overlay) { overlay.classList.remove('hidden'); }
  startCamera();
}

function closeScanner() {
  stopCamera();
  const overlay = document.getElementById('scanner-overlay');
  if (overlay) overlay.classList.add('hidden');
}

async function startCamera() {
  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
    });
    const video = document.getElementById('scanner-video');
    if (video) {
      video.srcObject = scannerStream;
      await video.play();
      scannerActive = true;
      requestAnimationFrame(scanFrame);
    }
  } catch (err) {
    console.warn('Caméra indisponible:', err);
    showScannerError();
  }
}

function stopCamera() {
  scannerActive = false;
  if (scannerStream) {
    scannerStream.getTracks().forEach(t => t.stop());
    scannerStream = null;
  }
  if (scannerInterval) { clearInterval(scannerInterval); scannerInterval = null; }
}

function scanFrame() {
  if (!scannerActive) return;
  const video = document.getElementById('scanner-video');
  if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
    requestAnimationFrame(scanFrame); return;
  }

  const canvas = document.createElement('canvas');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);

  try {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (typeof jsQR !== 'undefined') {
      const code = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: 'dontInvert' });
      if (code?.data) {
        handleScannedUrl(code.data);
        return; // Stop scanning
      }
    }
  } catch(e) {}

  if (scannerActive) requestAnimationFrame(scanFrame);
}

function handleScannedUrl(url) {
  stopCamera();
  closeScanner();

  try {
    const urlObj   = new URL(url);
    const token    = urlObj.searchParams.get('t');
    const access   = urlObj.searchParams.get('access');
    const corr     = urlObj.searchParams.get('correction');

    if (corr === CORRECTION_TOKEN) { window.location.href = url; return; }
    if (access === ACCESS_TOKEN)   { showScreen('screen-welcome'); return; }

    if (token && QR_TOKENS[token]) {
      const qId = QR_TOKENS[token];
      gameState.unlocked[qId] = true;
      gameState.started = true;
      saveState();
      buildQuestionGrid();
      updateProgress();
      showScreen('screen-game');
      if (!hasAnswered(qId)) setTimeout(() => openModal(qId), 400);
    } else {
      showScannerError('QR code non reconnu. Assurez-vous de scanner une pancarte du labyrinthe.');
    }
  } catch(e) {
    showScannerError('QR code invalide.');
  }
}

function showScannerError(msg) {
  const err = document.getElementById('scanner-error');
  if (err) {
    err.textContent = msg || "Impossible d'accéder à la caméra. Vérifiez les autorisations dans votre navigateur.";
    err.classList.remove('hidden');
  }
}

// ---- Événements ----
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-scan-header')?.addEventListener('click', openScanner);
  document.getElementById('btn-close-scanner')?.addEventListener('click', closeScanner);
  document.getElementById('scanner-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'scanner-overlay') closeScanner();
  });
});
