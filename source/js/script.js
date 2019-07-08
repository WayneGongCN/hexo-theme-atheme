window.onload = function () {
  // scrollTopTop
  pluginsConfig && pluginsConfig.scrollToTop && createScriptTag('/js/scrollToTop.js')

  // service worker
  if (location.host.indexOf('localhost') === -1) {
    'serviceWorker' in navigator && navigator.serviceWorker.register('/sw.js')
  }

  // disqus
  pluginsConfig && pluginsConfig.disqus && enableDisqus()
}


function enableDisqus () {
  const disqusEl = document.querySelector('#disqus_thread')
  if (!disqusEl) return

  window.disqus_config = function () {
    this.page.url = window.location.href
    this.page.identifier = window.location.pathname
  }
  createScriptTag(`https://${pluginsConfig.disqus}.disqus.com/embed.js`, { 'data-timestamp': +new Date() })
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
function createScriptTag (url, attribute) {
  const scriptTag = document.createElement('script')
  scriptTag.src = url

  if (attribute) {
    for (const key in attribute) {
      const value = attribute[key]
      scriptTag.setAttribute(key, value)
    }
  }

  document.body.appendChild(scriptTag)
}
