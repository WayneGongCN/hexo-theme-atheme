// import config from './config'

// import './modules/scrollToTop'
// import './modules/comments'
// import './modules/ga'


/**
 * service worker
 */
const isSupportWorker = 'serviceWorker' in navigator
if (isSupportWorker) {
  navigator.serviceWorker.register('/sw.js')
    .then(console.log.bind('register.then'))
}
