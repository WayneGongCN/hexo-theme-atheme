const cacheFileList = [
  '/css/style.css',
  '/css/post.css',
  '/js/script.js',
  '/js/scrollToTop.js'
]


/**
 * 保存到缓存
 * @param {reqyest} request 
 * @param {response} response 
 */
const saveToCache = (request, response) => caches
  .open('v1')
  .then(cache => {
    cache.put(request, response)
  })


/**
 * 未匹配到缓存
 * @param {request} request 
 */
const onNotMatch = request => fetch(request)
  .then(response => {
    const url = request.url
    const path = new URL(url).pathname

    const isInList = cacheFileList.indexOf(path) !== -1
    const isHtml = path.endsWith('.html')

    if (isInList || isHtml ) {
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
      return response
    }

    // 未命中 发起请求
    else {
      return onNotMatch(request)
    }
  })


this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('v1')
      .then(cache => cache.addAll(cacheFileList))
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(onFetch(event.request))
})

this.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keyList => Promise.all(keyList.map(key => caches.delete(key))))
  )
})
