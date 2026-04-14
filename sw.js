// ============================================================
// SW.JS — Service Worker · Mode hors-ligne
// Challenge des Experts · Labyrinthe En-Champ-Thé
// ============================================================

const CACHE_NAME = 'ect-v2-cache';
const ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './css/welcome.css',
  './css/game.css',
  './css/results.css',
  './js/data.js',
  './js/game.js',
  './js/results.js',
  './js/dragdrop.js',
  './js/scanner.js',
  './js/share.js',
  './images/logo-blanc.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@400;700&family=Inter:wght@500&display=swap',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
