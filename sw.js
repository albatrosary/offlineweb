/* global fetch */
/* global caches */
var CACHE_NAME = 'offline_cacheaaaa';
var path = '/offlineweb/';
var urlsToCache = [
      path,
      path+'style.css',
      path+'app.js',
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


this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        };
      }));
    })
  )
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
    // 使用可能なキャッシュと一致する場合
    caches.match(event.request)
      .catch(function() {
        
        return fetch(event.request).then(function(response) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });  
        });
      })
      .catch(function() {
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
      })
  );
});
