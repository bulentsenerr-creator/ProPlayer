// Pro Player SW (v16.1) - GitHub Pages /ProPlayer/
const CACHE = 'pro-player-cache-v16-1';
const BASE = self.registration.scope;
const u = (p) => new URL(p, BASE).toString();
const CORE = [
  u('./'),
  u('./index.html'),
  u('./manifest.json'),
  u('./icons/icon-192.png'),
  u('./icons/icon-512.png'),
  u('./icons/icon-192-maskable.png'),
  u('./icons/icon-512-maskable.png')
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(u('./index.html'))))
  );
});
