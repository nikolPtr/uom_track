self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('trackCss').then(function(cache) {
            return cache.addAll([
                '/uom_track/index.html',
                '/uom_track/common.js',
                '/uom_track/manifest.json',
                '/uom_track/track.js',
                '/uom_track/trackCss.css'
                '/uom_track/fwto1.jpg',
                '/uom_track/fwto2.jpg',
                '/uom_track/fwto3.jpg',
                '/uom_track/fwto4.svg',
                '/uom_track/icon1.png',
                '/uom_track/icon2.png'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || caches.match('/index.html');
        })
    );
});
