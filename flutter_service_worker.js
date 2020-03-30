'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/index.html": "1bce9673fff823c25b7a319a64f04bc1",
"/main.dart.js": "f668361596621bde99ff150341e872a9",
"/favicon.png": "ad740e900e2d1cc15babcc88c1fb84a8",
"/icons/Icon-192.png": "9f94c1998b1ff2194f11a65787c889f8",
"/icons/Icon-512.png": "a70399c3892a2231bb06141e22e8a0c3",
"/manifest.json": "66778a44a1e8003718d1c3f1d4e4550c",
"/assets/LICENSE": "441127c477dc8ff46f4115c86a7ee6ed",
"/assets/AssetManifest.json": "091f4130822431d02524c9685e8abadb",
"/assets/FontManifest.json": "772c3bc37b3ab152157969e0f111c4f6",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/fonts/CourierPrime-Regular.ttf": "03ef685b34f3356631c3f60c91917002"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
