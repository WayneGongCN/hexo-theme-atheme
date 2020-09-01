import { createScriptTag } from '../utils'

// if (!config.googleAnalytics) return

const scriptTag = createScriptTag(`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics}`, { async: true })

scriptTag.onload = function (e) {
  window.gtag = function () {
    dataLayer.push(arguments)
  }
  window.dataLayer = window.dataLayer || []

  gtag("js", new Date)
  gtag("config", id)
}
