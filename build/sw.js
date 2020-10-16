importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute([
  {
    "url": "css/materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "css/styles.css",
    "revision": "8e4df04a52184949e34df81e14ab65a6"
  },
  {
    "url": "index.html",
    "revision": "00759b9887b1b1e8844ea3341cc370fa"
  },
  {
    "url": "js/app.js",
    "revision": "4357dbdbcc80dcfbe1f8198ac0313009"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "87d84bf8b4cc051c16092d27b1a7d9b3"
  },
  {
    "url": "js/ui.js",
    "revision": "fb9b5ba3ff3f5777fad97b79472aa7e6"
  },
  {
    "url": "img/siddhu.jpg",
    "revision": "153f454f2a66601b8544a7d985b5ab39"
  },
  {
    "url": "img/icons/icon-128x128.png",
    "revision": "78923e6089bc468edb3090d817d737c0"
  },
  {
    "url": "img/icons/icon-144x144.png",
    "revision": "6eba231acdd307931ec8ca52dbffabe3"
  },
  {
    "url": "img/icons/icon-152x152.png",
    "revision": "191aef4be700e6a423f2405e9b6456ab"
  },
  {
    "url": "img/icons/icon-192x192.png",
    "revision": "656829d493479779af3c95e26123b6c7"
  },
  {
    "url": "img/icons/icon-384x384.png",
    "revision": "09bb67eb2f5e81950761c9dbf85a0493"
  },
  {
    "url": "img/icons/icon-512x512.png",
    "revision": "85a2cbcaa0cb319cf4f8f3af0de42e9c"
  },
  {
    "url": "img/icons/icon-72x72.png",
    "revision": "4fd5a4c024dab5c552ab175170fdc9a5"
  },
  {
    "url": "img/icons/icon-96x96.png",
    "revision": "b2ca55b8e5e7d3d9ff1f251599495800"
  },
  {
    "url": "pages/offline.html",
    "revision": "0bb22be809fd8542b7e5370298302eb0"
  },
  {
    "url": "pages/404.html",
    "revision": "bef2f433966e550f0fbbfe924ffdd5ed"
  },
  {
    "url": "pages/fallback.html",
    "revision": "270bb0dca3e25113b8948c4a87dc894f"
  }
]);

    const articleHandler = workbox.strategies.networkFirst({
        cacheName: 'html-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
            })
        ]
    });

    workbox.routing.registerRoute(/(.*)\.html/, args => {
        return articleHandler.handle(args).then(response => {
            if (!response) {
                return caches.match('pages/offline.html');
            } else if (response.status === 404) {
                return caches.match('pages/404.html');
            }
            return response;
        });
    });


    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                }),
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
            ],
        }),
    );


} else {
    console.log(`Workbox didn't load`);
}