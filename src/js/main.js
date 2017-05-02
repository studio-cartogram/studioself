/**
 * Setup webpack public path
 * to enable lazy-including of
 * js chunks
 *
 */
import 'babel-polyfill'
import Barba from 'barba.js'
import log from './utils/log'
import './vendor/webpack.publicPath'
import Curtain from './scripts/Curtain'
import Scroll from './scripts/Scroll'
import Fade from './scripts/Fade'
import removeClasses from './utils/removeClasses'
import imagesLoaded from 'imagesloaded'
import {
  ACTIVE_CLASS,
} from './config'

class App {
  constructor() {
    log('starting app')
    document.body.classList.add('js-is-initialized')
    this.init()
    this.curtainEl = document.getElementById('js-curtain')
    this.curtain = new Curtain(this.curtainEl)
    Barba.Pjax.init()
    Barba.Prefetch.init()
    Barba.Pjax.getTransition = () =>  this.Transition
  }

  init = () => {
    this.scroll = new Scroll()
    this.fade = new Fade()
    this.initTransitions()
    imagesLoaded( document.querySelector('#js-main'), instance => {
      document.body.classList.remove('js-is-loading')
      log('images loaded')
      setTimeout(() => {
        this.curtain.hide()
      }, 2000)
    })
    Barba.Dispatcher.on('initStateChange', () => {
      document.body.classList.add('js-is-loading')
      document.body.classList.remove('js-is-leaving')
    })
    Barba.Dispatcher.on('linkClicked', el => {
      const xs = document.getElementsByClassName(ACTIVE_CLASS)
      if (xs.length > 0) {
        removeClasses(xs, ACTIVE_CLASS)
      }
      el.classList.add(ACTIVE_CLASS);
    })
    Barba.Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
      document.body.classList.remove('js-is-loading')
      document.body.classList.remove('js-is-leaving')
    })
  }

  initTransitions = () => {
    const _scrollTop = this.scroll.scrollTop.bind(this)
    // const _fadeOut = this.fade.fadeOut.bind(this)
    // const _fadeIn = this.fade.fadeIn.bind(this)

    this.Transition = Barba.BaseTransition.extend({
      start() {
        Promise
        .all([
          // _fadeOut(this.oldContainer).finished,
          this.newContainerLoading,
          _scrollTop().finished,
        ])
        .then(this.showNewPage.bind(this))
      },

      showNewPage() {
        // _fadeIn(this.newContainer)
        this.done()
      },
    })
  }
}

const app = new App()

window.app = app

