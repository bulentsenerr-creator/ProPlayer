// Pro Player SW (v16.2) - GitHub Pages /ProPlayer/
const CACHE = 'pro-player-cache-v16-2';
const BASE = self.registration.scope;
const u = (p) => new URL(p, BASE).toString();

const CORE = [
  u('./'),
  u('./index.html'),
  u('./manifest.json'),
  u('./library.json'),
  u('./icons/icon-192.png'),
  u('./icons/icon-512.png'),
  u('./icons/icon-192-maskable.png'),
  u('./icons/icon-512-maskable.png')
];

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // library.json -> network-first
  if (url.pathname.endsWith('/library.json')) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        const copy = fresh.clone();
        const c = await caches.open(CACHE);
        await c.put(req, copy);
        return fresh;
      } catch (err) {
        const cached = await caches.match(req);
        return cached || new Response(JSON.stringify({ items: [] }), {
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
    })());
    return;
  }

  // Navigations and index -> network-first
  const isNavigation = req.mode === 'navigate';
  const isIndex = url.pathname.endsWith('/index.html') || url.pathname.endsWith('/ProPlayer/') || url.pathname.endsWith('/ProPlayer');
  if (isNavigation || isIndex) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const copy = fresh.clone();
        const c = await caches.open(CACHE);
        await c.put(req, copy);
        return fresh;
      } catch (err) {
        const cached = await caches.match(req);
        return cached || caches.match(u('./index.html'));
      }
    })());
    return;
  }

  // Default: cache-first
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(u('./index.html'))))
  );
});
