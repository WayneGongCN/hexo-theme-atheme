window.onload = function () {
  if (pluginsConfig) {
    const { scrollToTop, comments, googleAnalytics } = pluginsConfig

    // scrollTopTop
    scrollToTop && createScriptTag('/js/scrollToTop.js')

    // service worker
    'serviceWorker' in navigator && navigator.serviceWorker.register('/sw.js')

    // comments
    comments && comments.enable && enableComments(comments)

    // googleAnalytics
    googleAnalytics && enableGoogleAnalytics(googleAnalytics)
  }
}


/**
 * 启用评论
 * @param {Object} config 
 */
function enableComments(config) {
  const triggerEl = document.querySelector('.markdown-body p:last-child')
  const observe = new IntersectionObserver(onTriggerEmit)

  observe.observe(triggerEl)

  // 滚动到文章末尾触发
  function onTriggerEmit (e) {
    const ioe = e[0]
    const isIntersecting = ioe.isIntersecting
    
    if (isIntersecting) loadUtterances()
  }

  function loadUtterances () {
    const defaultConfig = {
      'issue-term': "pathname",
      theme: "github-light",
      crossorigin: "anonymous",
      async: true,
      ...config
    }
    createScriptTag(`https://utteranc.es/client.js`, defaultConfig)
    observe.disconnect()
  }
}


/**
 * 启用 Google 分析
 * @param {string} id 
 */
function enableGoogleAnalytics(id) {
  const scriptTag = createScriptTag(`https://www.googletagmanager.com/gtag/js?id=${id}`, { async: true })

  scriptTag.onload = function (e) {
    window.gtag = function () {
      dataLayer.push(arguments)
    }
    window.dataLayer = window.dataLayer || []
    gtag("js", new Date)
    gtag("config", id)
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
