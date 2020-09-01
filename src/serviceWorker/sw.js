let version = Date.now()
version = `${version}`

const preCacheing = [
  '/css/style.css',
  '/main.js',
  '/css/post.css'
]

const cacheFirst = [
  '/analytics.js',
  '/js/scrollToTop.js',
  '/images/favicon.ico',
  '/images/icon.png',
  '/manifest.json',
  '/client.js'
]

const cacheList = preCacheing.concat(cacheFirst)


/**
 * 保存到缓存
 * @param {reqyest} request 
 * @param {response} response 
 */
const saveToCache = (request, response) => caches
  .open(version)
  .then(cache => {
    cache.put(request, response)
  })


/**
 * 未匹配到缓存
 * @param {request} request 
 */
const onNotMatch = request => fetch(request)
  .then(response => {
    if (isInCacheList(request.url) || isHtml(request.url)) {
      const responseClone = response.clone()
      saveToCache(request, responseClone)
    }

    return response
  })
  .catch(error => {
    console.error('[SW]', error)
  })


/**
 * 处理 fetch
 */
const onFetch = request => caches
  .match(request)
  .then(response => {
    // 命中缓存
    if (response !== undefined) {

      // Stale-While-Revalidate
      if (isHtml(request.url)) {
        onNotMatch(request)
      }
  
      return response
    }

    // 未命中 发起请求
    else {
      return onNotMatch(request)
    }
  })


this.addEventListener('install', event => {
  console.log('Worker on install')
  event.waitUntil(
    caches
      .open(version)
      .then(cache => cache.addAll(preCacheing))
  )
})

this.addEventListener('fetch', event => {
  console.log('Worker on fetch')

  event.respondWith(onFetch(event.request))
})

this.addEventListener('activate', event => {
  console.log('Worker on activate')

  event.waitUntil(
    caches
      .keys()
      .then(keyList => Promise.all(keyList.filter(x => x !== version).map(key => caches.delete(key))))
  )
})


function isHtml (url) {
  return new URL(url).pathname.endsWith('.html')
}

function isInCacheList (url) {
  return cacheList.indexOf(new URL(url).pathname) !== -1
}