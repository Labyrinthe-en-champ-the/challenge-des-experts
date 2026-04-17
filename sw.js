const C='ect-final';
const A=['./','./index.html','./style.css','./app.js','./logo-blanc.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>{if(r)return r;return fetch(e.request).then(res=>{if(!res||res.status!==200||res.type==='opaque')return res;caches.open(C).then(c=>c.put(e.request,res.clone()));return res;}).catch(()=>caches.match('./index.html'));}));});
