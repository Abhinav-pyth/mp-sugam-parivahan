// Service Worker required by Monetag / ad-network verification.
// The ad tag (https://quge5.com/88/tag.min.js) registers this file at the
// site root. This "pass-through" worker lets all network requests proceed
// normally so the verification check succeeds.

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  // Do not intercept/cache anything - just let the request go to the network.
  return;
});
