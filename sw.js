/* global fetch */
/* global caches */
var path = '/offlineweb/';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        path,
        path+'index.html',
        path+'style.css',
        path+'app.js',
        path+'image-list.js',
        path+'star-wars-logo.jpg',
        path+'gallery/',
        path+'gallery/bountyHunters.jpg',
        path+'gallery/myLittleVader.jpg',
        path+'gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/sw-test/gallery/myLittleVader.jpg');
  }));
});
