const CACHE_NAME = 'dsa-house-cache-v2';
const PRECACHE_ASSETS = [
  '/',
  '/roadmap',
  '/dashboard',
  '/topics',
  '/labs',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Don't let one 404 abort the whole install (cache.addAll is all-or-nothing).
      return Promise.all(
        PRECACHE_ASSETS.map((asset) =>
          cache.add(asset).catch(() => {
            console.warn('[sw] precache skipped:', asset);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

function isCacheable(request) {
  // The Cache API only supports GET; cache.put() throws on anything else.
  if (request.method !== 'GET') return false;
  if (!request.url.startsWith('http')) return false;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;

  // Never cache API traffic. /api/auth/session returns the caller's admin
  // claim — serving a stale copy after logout or a privilege change would be
  // both wrong and a security problem.
  if (url.pathname.startsWith('/api/')) return false;

  // React Server Component payloads are keyed by request headers the Cache API
  // ignores, so a cached copy can be replayed for the wrong route.
  if (url.searchParams.has('_rsc')) return false;

  return true;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Anything not cacheable goes straight to the network, untouched.
  if (!isCacheable(request)) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, responseToCache))
            .catch((err) => console.warn('[sw] cache write failed:', err));
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;

        if (request.mode === 'navigate') {
          const shell = await caches.match('/');
          if (shell) return shell;
        }

        // Always resolve with a real Response — resolving with undefined
        // surfaces as an opaque network error in the page.
        return new Response('Offline and no cached copy is available.', {
          status: 503,
          statusText: 'Offline',
          headers: { 'Content-Type': 'text/plain' },
        });
      })
  );
});
