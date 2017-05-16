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
    // Barba.Dispatcher.on('linkClicked', el => {
    //   const xs = document.getElementsByClassName(ACTIVE_CLASS)
    //   if (xs.length > 0) {
    //     removeClasses(xs, ACTIVE_CLASS)
    //   }
    //   el.classList.add(ACTIVE_CLASS);
    // })
    Barba.Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
      document.body.classList.remove('js-is-moving')
    })
  }

  // loadImages = () => {
  //   imagesLoaded(document.querySelector('#js-main'), instance => {
  //     log('images loaded')
  //     document.body.classList.remove('js-is-loading')
  //   })
  // }

  initTransitions = () => {
    // const _scrollTop = this.scroll.scrollTop.bind(this)
    // const _showCurtain = this.curtain.show.bind(this)
    // const _hideCurtain = this.curtain.hide.bind(this)
    // const _fadeOut = this.fade.fadeOut.bind(this)
    // const _fadeIn = this.fade.fadeIn.bind(this)

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

