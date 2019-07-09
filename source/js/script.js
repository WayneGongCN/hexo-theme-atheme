window.onload = function () {
  // scrollTopTop
  pluginsConfig && pluginsConfig.scrollToTop && createScriptTag('/js/scrollToTop.js')

  // service worker
  if (location.host.indexOf('localhost') === -1) {
    'serviceWorker' in navigator && navigator.serviceWorker.register('/sw.js')
  }

  // comments
  pluginsConfig && pluginsConfig.comments && pluginsConfig.comments.enable && enableComments(pluginsConfig.comments)
}


function enableComments (config) {
  const defaultConfig = {
    'issue-term': "pathname",
    theme: "github-light",
    crossorigin: "anonymous",
    async: true,
    ...config
  }
  createScriptTag(`https://utteranc.es/client.js`, defaultConfig)
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
