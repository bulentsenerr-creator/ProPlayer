const CACHE='pro-player-v16-cache-v2';
const ASSETS=[
  './',
  './index.html',
  './app.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE?caches.delete(k):null))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request; const url=new URL(req.url);
  if(req.method!=='GET' || url.origin!==self.location.origin) return;
  e.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>{ if(ASSETS.some(a=>url.pathname.endsWith(a.replace('./','')))) c.put(req,copy); });
    return res;
  }).catch(()=>caches.match('./index.html'))));
});
