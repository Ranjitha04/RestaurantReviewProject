const filesToCache = [
    '/',
'index.html',
'restaurant.html',
'css/styles.css',
'js/dbhelper.js',
'js/main.js',
'js/restaurant_info.js',
'img/1.jpg',
'img/2.jpg',
'img/3.jpg',
'img/4.jpg',
'img/5.jpg',
'img/6.jpg',
'img/7.jpg',
'img/8.jpg',
'img/9.jpg',
'img/10.jpg',
  ];
  
const staticCacheName = 'restaurantReview-cache-v1';

/*
 * Cache all pages and assets required for offline access
 */
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });

/*
 * Activate Service worker and delete old cache (if any) add new cache
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.filter((cacheName) => {
      return cacheName.startsWith('mws-') && cacheName != staticCacheName;
    }).map((cacheName) => {
      return caches.delete(cacheName);
    }));
  }));
});

/*
 * Match all request against the cache to respond accordingly
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => {
    return response ||
    caches.open(staticCacheName).then((cache) => {
      return fetch(event.request).then((response) => {
        return response;
      });
    });
  }).catch(function() {
      return new Response("You are offline, and we didn't find any old cache for the URL.")
  })
  );
});
