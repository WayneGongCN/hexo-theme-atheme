window.onload = function () {
  if (pluginsConfig) {
    const { scrollToTop, comments, googleAnalytics } = pluginsConfig

    // scrollTopTop
    scrollToTop && createScriptTag('/js/scrollToTop.js')

    // service worker
    'serviceWorker' in navigator && navigator.serviceWorker.register('/sw.js')

    // comments
    comments && comments.enable && createScriptTag('/js/comments.js', { async: true })

    // googleAnalytics
    googleAnalytics && createScriptTag('/js/ga.js', { async: true })
  }
}


// Utils
/**
 * 节流函数
 * @param {function} fn
 * @param {number} timeout 
 */
function throttle(fn, timeout = 250) {
  const self = this
  let timer = null

  return function (...args) {
    if (timer) return
    timer = setTimeout(function () {
      fn.call(self, ...args)
      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}


/**
 * 动态创建 script 标签
 */
function createScriptTag(url, attribute) {
  const scriptTag = document.createElement('script')
  scriptTag.src = url

  if (attribute) {
    for (const key in attribute) {
      const value = attribute[key]
      scriptTag.setAttribute(key, value)
    }
  }

  document.body.appendChild(scriptTag)
  return scriptTag
}
