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
  const observe = new IntersectionObserver(onEmitTrigger)

  observe.observe(triggerEl)
  addEventListener('message', onCommentsLoaded)

  // 滚动到文章末尾触发
  function onEmitTrigger (e) {
    const ioe = e[0]
    const isIntersecting = ioe.isIntersecting
    console.log(isIntersecting)
    if (isIntersecting) loadCommentScript()
  }

  function loadCommentScript () {
    observe.disconnect()

    const defaultConfig = {
      'issue-term': "pathname",
      theme: "github-light",
      crossorigin: "anonymous",
      async: true,
      ...config
    }
    createScriptTag(`https://utteranc.es/client.js`, defaultConfig)
  }

  
  /**
   * 评论加载完成后 添加样式 移除监听
   * @param {*} e 
   */
  function onCommentsLoaded (e) {
    if (e.origin !== 'https://utteranc.es') return

    const commentsContainer = document.querySelector('.utterances')
    commentsContainer && (commentsContainer.style['border-top'] = '1px solid #eaecef')
    
    removeEventListener('message', onCommentsLoaded)
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
