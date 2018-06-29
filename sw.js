importScripts('/cache-polyfill.js');

var staticCacheName = 'mws-restaurants-v1';
var urls = ['/',
  '/index.html',
  '/restaurant.html',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'css/styles.css',
  'data/restaurants.json'
];

for (i = 1; i <= 10; i++) {
  urls.push('img/'+i+'.jpg');
}

self.addEventListener('install', e => {
 e.waitUntil(
   caches.open(staticCacheName).then( cache => {
     urls.forEach(url => {
        cache.add(url).catch(console.log('failed caching url: '+url));
     });
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
