const CACHE_NAME = 'WRA-cache-v1.0.0';
const urlsToCache = [
    './dollar.html',
    './index.html',
    './legal.html',
    './manifest.json',
    './pesos.html',
    './rate.html',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    './dist/bundle.js',
    './dist/bundle.js.LICENSE.txt'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
