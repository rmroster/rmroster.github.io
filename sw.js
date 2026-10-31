// The site has been shut down: clear everything stored and remove this service worker.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (names) { return Promise.all(names.map(function (n) { return caches.delete(n); })); })
    .then(function () { return self.registration.pushManager.getSubscription(); })
    .then(function (sub) { return sub && sub.unsubscribe(); })
    .catch(function () {})
    .then(function () { return self.registration.unregister(); }));
});
