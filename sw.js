const CACHE='ect-v3';
const ASSETS=['./','./index.html','./style.css','./app.js','./logo-blanc.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(cached=>{if(cached)return cached;return fetch(e.request).then(r=>{if(!r||r.status!==200||r.type==='opaque')return r;caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>caches.match('./index.html'));}));});
