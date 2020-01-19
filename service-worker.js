// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//Precaching App Shell
if (workbox){
  console.log(`Workbox loaded successfully`);
  workbox.precaching.precacheAndRoute([
    "/",
    "/nav.html",
    "/gofootball.html",
    "/article.html",
    "/pages/home.html",
    "/pages/teams.html",
    "/pages/standing.html",
    "/pages/saved.html",
    "/css/materialize.min.css",
    "css/footballstyle.css",
    "/js/materialize.min.js",
    "/manifest.json",
    "/js/nav.js",
    "/js/apiayu.js",
    '/js/idb.js',
    '/js/db.js',
    "/assets/uefa.png",
    "/assets/digitradiart.png",
    "/assets/soccer-ball.png",
    "/assets/soccer-ball.svg",
    "/assets/github.png",
    "/assets/instagram.png",
    "/assets/linkedin.png",
    "/assets/apple-icon-180x180.png"
]);

    workbox.routing.registerRoute(
        new RegExp('/pages'),
        workbox.strategies.cacheFirst({
            cacheName: 'Go Football Cache'
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('/css/materialize.min.css'),
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'Go Football Image',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.cacheFirst({
            cacheName: 'Go Football API',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'Go Football Font'
        })
    );
}else{
    console.log(`Workbox failed to load`);
}


/////////// push notification //////////////
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/assets/digitradiart.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});


/*const CACHE_NAME = "firstpwa-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/gofootball.html",
  "/article.html",
  "/pages/home.html",
  "/pages/teams.html",
  "/pages/standing.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "css/footballstyle.css",
  "/js/materialize.min.js",
  "/manifest.json",
  "/js/nav.js",
  "/js/apiayu.js",
  '/js/idb.js',
  '/js/db.js',
  "/assets/uefa.png",
  "/assets/digitradiart.png",
  "/assets/soccer-ball.png",
  "/assets/soccer-ball.svg",
  "/assets/github.png",
  "/assets/instagram.png",
  "/assets/linkedin.png"

];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { 'ignoreSearch': true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/////////// push notification //////////////
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/assets/digitradiart.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
*/