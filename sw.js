var CACHE = 'aj-radon-v4';
var CORE = [
  './',
  'index.html',
  'how-it-works.html',
  'about.html',
  'contact.html',
  'styles.css',
  'app.js',
  'manifest.webmanifest',
  'assets/icon.svg',
  'assets/mitigation-diagram.svg'
];
var OPTIONAL = [
  'assets/hero-neighborhood.jpg',
  'assets/aj-on-site.jpg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.all(CORE.map(function (u) { return cache.add(new Request(u, { cache: 'reload' })); })).then(function () {
        return Promise.all(OPTIONAL.map(function (url) {
          return cache.add(url).catch(function () {});
        }));
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then(function (response) {
        var copy = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
        return response;
      })
      .catch(function () { return caches.match(event.request).then(function (hit) { return hit || caches.match('index.html'); }); })
  );
});
