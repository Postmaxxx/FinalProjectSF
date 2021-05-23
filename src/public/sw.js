//import { cache } from "webpack"

const staticCacheName = 's-app-v10'
const dynamicCacheName = 'd-app-v10'

const assetUrls = [
    'index.html',
    'src_App_jsx.styles.css',
    'src_components_Footer_Footer_jsx.styles.css',
    'src_App_jsx.bundle.js',
    'bundle.js',
    'offline.html',
    'vendors-node_modules_babel_runtime_helpers_esm_createClass_js-node_modules_babel_runtime_help-e4ef96.bundle.js'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
    console.log('installed', event);
})


self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys();
    console.log('activated', cacheNames);
    await Promise.all(
        cacheNames
            .filter(name => name !== staticCacheName)
            .filter(name => name !== dynamicCacheName)
            .map(name => {
                console.log('Delete name: ', name);
                caches.delete(name)
            }))
})


self.addEventListener('fetch', async event => {
    const { request } = event;
    const url = new URL(request.url);
    console.log('fetching: ', url);


    if (url.origin === location.origin ) {
        console.log('local: ', url.origin);
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }


})



async function cacheFirst(request) {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}


async function networkFirst(request) {
    const dynamicCache = await caches.open(dynamicCacheName)
    //const url = new URL(request.url);
    try {
        const response = await fetch(request)
        dynamicCache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await dynamicCache.match(request)
        return cached ?? null//caches.match('/offline.html')
    }


    
}