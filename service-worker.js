const CACHE_NAME = 'jamiasto-core-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Activate - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Fetch - try cache first, fallback to network, then fallback to cache index
self.addEventListener('fetch', event => {
  // ignore non-GET or cross-origin requests to APIs
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Allow navigation to work offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // put a copy in cache
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        // best-effort fallback: return cached index or icon if exists
        return caches.match('./index.html');
      });
    })
  );
});