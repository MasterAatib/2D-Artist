/* 2D Artist service worker: after the first visit the whole site also opens with no internet.
 *
 * Pages are fetched from the network first, so you always get the newest version when you are online,
 * and fall back to the saved copy when you are offline or the connection is slow (over 4 seconds).
 * There is no version number to bump when you update the app: just commit the new tool.html.
 * Only change CACHE below if you add, rename or remove files in FILES.
 */
const CACHE = '2d-artist-files-2';
const FILES = ['./', 'index.html', 'tool.html', 'manifest.webmanifest', 'assets/pixelify-sans.woff2',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];
const SLOW_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await Promise.race([
      fetch(req, { cache: 'no-cache' }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('slow network')), SLOW_MS)),
    ]);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const saved = (await cache.match(req, { ignoreSearch: true })) || (req.mode === 'navigate' ? await cache.match('index.html') : null);
    return saved || new Response('2D Artist is offline and this file is not saved yet. Open the site once while online.', { status: 503, headers: { 'content-type': 'text/plain' } });
  }
}
