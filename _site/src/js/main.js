/**
 * Setup webpack public path
 * to enable lazy-including of
 * js chunks
 *
 */
import 'babel-polyfill'
import debounce from 'lodash/debounce'
import Barba from 'barba.js'
import log from './utils/log'
import './vendor/webpack.publicPath'
import Curtain from './scripts/Curtain'
// import Scroll from './scripts/Scroll'
// import Fade from './scripts/Fade'
import removeClasses from './utils/removeClasses'
import imagesLoaded from 'imagesloaded'
import addListenerMulti from './utils/addListenerMulti'
import 'lazysizes'

import {
  ACTIVE_CLASS,
  SAVER_WAIT_DURATION,
} from './config'

class App {
  constructor() {
    log('starting app')
    document.body.classList.add('js-is-initialized')
    this.init()
    Barba.Pjax.init()
    Barba.Prefetch.init()
    Barba.Pjax.getTransition = () =>  this.Transition
    document.body.classList.remove('js-is-loading')
  }

  init = () => {
    this.curtainEl = document.getElementById('js-curtain')
    this.curtain = new Curtain(this.curtainEl)
    // this.scroll = new Scroll()
    // this.fade = new Fade()
    this.initTransitions()
    this.initSaver()
    // this.loadImages()
    Barba.Dispatcher.on('initStateChange', () => {
      document.body.classList.add('js-is-moving')
    })

    Barba.Dispatcher.on('linkClicked', el => {
      this.clickedEl = el
      console.log(el, Barba.HistoryManager.prevStatus())
      // if (Barba.HistoryManager.prevStatus().namespace === 'home') {
      //   this.returnTo = this.clickedEl && this.clickedEl.offsetTop;
      //   if (this.wrapper) {
      //     this.wrapper.scrollTop = parseInt(document.body.setAttribute('data-scroll-start', this.returnTo), 10);
      //   }
      // }
    })

    Barba.Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
      document.body.classList.remove('js-is-moving')
    })
  }

  initTransitions = () => {

    this.Transition = Barba.BaseTransition.extend({
      start() {
        Promise
        .all([
          this.newContainerLoading,
        ])
        .then(this.showNewPage.bind(this))
      },

      showNewPage() {
        document.body.scrollTop = 0
        this.done()
      },
    })
  }

  saverShown = false
  initSaver = () => (addListenerMulti(document.body, 'mousemove touchmove', debounce(this.mouseMove, 60)))
  mouseMove = e => {
    clearTimeout(this.cursorTimer)

    if (this.saverShown) {
      this.curtain.hide()
      this.saverShown = false
    }

    this.cursorTimer = setTimeout(() => {
      this.curtain.show()
      this.saverShown = true
    }, SAVER_WAIT_DURATION)
  }
}

const app = new App()

window.app = app

