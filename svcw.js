const CACHE_NAME = 'cache2';
const urlsToCache = [
    'index.html',
    'bundle.js',
    '/assets/tree.obj',
    '/assets/tree.mtl',
    '/assets/beer-bottle.obj',
    '/assets/beer-bottle.mtl',
    '/assets/cup-obj/cup.obj',
    '/assets/cup-obj/cup.mtl',
    '/assets/table-and-chair.obj',
    '/assets/table-and-chair.mtl',
    'findpoi.webmanifest',
    '/icons/animal.png'
];

self.addEventListener('install', ev => {

    console.log('Installed the service worker...');
    ev.waitUntil(caches.open(CACHE_NAME).then(cache => {
        console.log(`Opened cache ${cache}`);
        return cache.addAll(urlsToCache);
    })
    );
});

self.addEventListener('activate', ev=> {
    console.log('Claiming control...');
    return self.clients.claim();
});

self.addEventListener('fetch', ev => {
    console.log(`Service worker intercepted request for: ${ev.request.url}`);
    const url = new URL(ev.request.url);
    ev.respondWith(
        caches.match(ev.request).then(res=> {
            if(res) {
                return res;
            }
            
            if(ev.request.url.indexOf("https://hikar.org/webapp/proxy.php") != -1) {                
                return fetch(ev.request)
                    .then(res2 => {
                        console.log("Caching as matches pattern");
                        return caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(ev.request, res2.clone());
                                return res2;
                            });
                    });            
            } else {
                return fetch(ev.request);
            }
        }));
    
});