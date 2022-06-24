var CACHE_NAME = 'mujtahidin-cache-v1';
var urlsToChace = [
    '/',
    '/index.html',
    '/page.html',
];

self.addEventListener('install', function(event) {
    //perporma install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToChace);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.responWith(
        caches.match(event.request)
        .then(function(response) {
            //Cache hit - return response
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});

self.addEventListener('active', function(event) {
    
    var cachesitemList = CACHE_NAME;

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cachesNames.map(function(cachesNames) {
                    if (cacheWhiteList.index.OF(cacheName) === -1) {
                        return caches.delete(cachesName);
                    }
                })
            );
        })
    );
});
