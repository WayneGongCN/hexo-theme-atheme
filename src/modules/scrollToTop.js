import { throttle } from '../utils'

let windowHeight = window.innerHeight
const scrollToTopContainerId = 'scroll-to-top-container'
const scrollToTopContainerEl = document.querySelector(`#${scrollToTopContainerId}`)

// Event handlers
const handlerWindowScroll = throttle(
  e => {
    if (window.scrollY > windowHeight) {
      scrollToTopContainerEl.style.display = 'block'
    } else {
      scrollToTopContainerEl.style.display = 'none'
    }
  }
)

const handlerWindowResize = throttle(
  e => {
    windowHeight = window.innerHeight
  }
)

const handlerScrollToTop = e => {
  setTimeout(
    () => scrollTo({ top: 0, behavior: pluginsConfig.scrollSmooth && 'smooth' || 'auto' }),
    0
  )
}

window.addEventListener('scroll', handlerWindowScroll)
window.addEventListener('resize', handlerWindowResize)
scrollToTopContainerEl.addEventListener('click', handlerScrollToTop)
scrollToTopContainerEl.addEventListener('touch', handlerScrollToTop)
