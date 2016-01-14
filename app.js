// register service worker
// http://albatrosary.github.io/offlineweb/

// Service Workersがサポートされているか
if ('serviceWorker' in navigator) {
  
  // JavaScriptファイルをこのサイトのService Wokerとして登録
  navigator
    .serviceWorker
    .register('/offlineweb/sw.js') // Promise
    .then(function(reg) {
      if(reg.installing) {
        console.log('Service worker installing');
      } else if(reg.waiting) {
        console.log('Service worker installed');
      } else if(reg.active) {
        console.log('Service worker active');
      }
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
};
