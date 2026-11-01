const C='spendwise-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(h=>{const n=fetch(e.request).then(r=>{if(r.ok){const p=r.clone();caches.open(C).then(c=>c.put(e.request,p))}return r}).catch(()=>h||caches.match('index.html'));return h||n}))});
