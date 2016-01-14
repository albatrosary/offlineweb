// register service worker
// http://albatrosary.github.io/offlineweb/

// Service Workersがサポートされているか
if ('serviceWorker' in navigator) {
  
  // JavaScriptファイルをこのサイトのService Wokerとして登録
  navigator
    .serviceWorker
    .register('/offlineweb/sw.js', {scope: '/offlineweb/'}) // Promise
    .then(function(request) {
      console.log(request);
      if(request.installing) {
        console.log('Service worker installing');
      } else if(request.waiting) {
        console.log('Service worker installed');
      } else if(request.active) {
        console.log('Service worker active');
      }
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });

    navigator
      .serviceWorker
      .getRegistration()
      .then(function(registration) {
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
};