// register service worker
// http://albatrosary.github.io/offlineweb/
var registration;
function register() {
  // Service Workersがサポートされているか
  if ('serviceWorker' in navigator) {
    
    // JavaScriptファイルをこのサイトのService Wokerとして登録
    navigator
      .serviceWorker
      .register('/offlineweb/service-worker.js', {scope: '/offlineweb/'}) // Promise
      .then(function(request) {
        console.log(request);
        registration = request;
        if(request.installing) {
          console.log('Service worker installing');
        } else if(request.waiting) {
          console.log('Service worker installed');
        } else if(request.active) {
          console.log('Service worker active');
        }
      }).catch(function(error) {
        // registration failed
        console.error('Registration failed with ', error);
      });
  }
}

function unregister() {
  registration.unregister()
    .then(function() {
      console.log('unregistered');
    });
}

navigator
  .serviceWorker
  .getRegistration()
  .then(function(registration) {
    // sw.js が更新されたとき registration.update() でService Workerを更新する
    console.log('registration');
    return registration.update(); 
  })
  .then(function() {
    // The script is updated, or there is no updated script.
    console.log('The script is updated, or there is no updated script.');
  })
  .catch(function(e) {
    // An error occurs during update (eg. Network error, Runtime error).
    console.log('An error occurs during update (eg. Network error, Runtime error).');
  });