/* global fetch */
/* global caches */
var path = '/offlineweb/';
var CACHE_NAME = 'offline_cache';

this.addEventListener('install', function(event) {
  
  console.log('Install Event Listener');
  
  event.waitUntil(
    // 新しいキャッシュを生成する 
    // promiseが拒否された場合やインストールが失敗した場合、workerは何もしません。
    // コードを修正して再度登録にトライすればOKです。
    caches.open(CACHE_NAME)
      .then(function(cache) {
        
        // URL 配列を受け取り、それらを取得して指定された cache に結果のレスポンスオブジェクトを追加する。
        // return cache.addAll([
        //   path,
        //   path+'index.html',
        //   path+'style.css',
        //   path+'app.js',
        //   path+'image-list.js',
        //   path+'star-wars-logo.jpg'
        // ]);
        return cache.put([
          path,
          path+'index.html',
          path+'style.css',
          path+'app.js',
          path+'image-list.js',
          path+'star-wars-logo.jpg'
        ]);
      })
  );
});

// fetch: Service Workersにキャッシュされたコンテンツに何かさせる
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
