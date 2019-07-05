window.onload = function () {
  // scrollTopTop
  pluginsConfig && pluginsConfig.scrollToTop && createScriptTag('/js/scrollToTop.js')

  // service worker
  'serviceWorker' in navigator && navigator.serviceWorker.register('/sw.js')
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
function createScriptTag (url) {
  const scriptTag = document.createElement('script')
  scriptTag.src = url
  document.body.appendChild(scriptTag)
}
