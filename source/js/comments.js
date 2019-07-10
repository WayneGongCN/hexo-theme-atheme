(function (config) {
  const triggerEl = document.querySelector('.markdown-body p:last-child')
  const observe = new IntersectionObserver(onEmitTrigger)

  observe.observe(triggerEl)
  addEventListener('message', onCommentsLoaded)


  // 滚动到文章末尾触发
  function onEmitTrigger(e) {
    const ioe = e[0]
    const isIntersecting = ioe.isIntersecting

    if (isIntersecting) loadCommentScript()
  }


  /**
   * 加载脚本
   */
  function loadCommentScript() {
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
  function onCommentsLoaded(e) {
    if (e.origin !== 'https://utteranc.es') return

    const commentsContainer = document.querySelector('.utterances')
    commentsContainer && (commentsContainer.style['border-top'] = '1px solid #eaecef')

    removeEventListener('message', onCommentsLoaded)
  }
})(pluginsConfig.comments)