/* global fetch */
/* global caches */
var CACHE_NAME = 'offline_cache';
var path = '/offlineweb/';
var urlsToCache = [
      path,
      path+'index.html',
      path+'style.css',
      path+'app.js',
      path+'image-list.js',
      path+'star-wars-logo.jpg'
    ];

this.addEventListener('install', function(event) {
  
  console.log('Install Event Listener');
  
  event.waitUntil(
    // 新しいキャッシュを生成する 
    // promiseが拒否された場合やインストールが失敗した場合、workerは何もしません。
    // コードを修正して再度登録にトライすればOKです。
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // URL 配列を受け取り、それらを取得して指定された cache に結果のレスポンスオブジェクトを追加する。
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// fetch: Service Workersにキャッシュされたコンテンツに何かさせる
// Service Worker がインストールされた状態で、
// 他のページヘ移動したりページを更新したりすると、
// Service Worker は fetch イベントを受け取ります。
this.addEventListener('fetch', function(event) {
  console.log('Fetch Event Listener');
  // イベントリスナーをservice workerにアタッチしてから、
  // HTTPレスポンスをハイジャックしてマジックを使って更新するために、
  // イベント上でrespondWith() メソッドを呼び出せます。
  event.respondWith(
    caches.match(event.request).catch(function() {
      return fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});
