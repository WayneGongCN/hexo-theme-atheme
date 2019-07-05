this.addEventListener('install', event => {
  event.waitUntil(
    // cache list
    caches.open('v1').then(cache => cache.addAll([
      '/css/style.css',
      '/css/post.css',
      '/js/script.js',
      '/js/scrollToTop.js'

    ]))
  )
})

this.addEventListener('fetch', event => {
  // 拦截请求
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 命中缓存
        if (response !== undefined) {
          return response
        } 
        
        // 未命中 发起请求
        else {
          return fetch(event.request)
            .then(response => {
              let responseClone  = response.clone()

              caches.open('v1')
                .then(cache => {
                  cache.put(event.request, responseClone)
                })
              return response
            })
            .catch(error => {
              console.error(error)
            })
        }
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    // delete cache
    caches.keys()
      .then(keyList => Promise.all(keyList.map(key => caches.delete(key))))
  )
})
