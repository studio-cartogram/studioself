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
    this.returnTo = 0
  }

  init = () => {
    this.curtainEl = document.getElementById('js-curtain')
    this.curtain = new Curtain(this.curtainEl)
    this.initTransitions()
    this.initSaver()
    Barba.Dispatcher.on('initStateChange', () => {
      document.body.classList.add('js-is-moving')
    })

    Barba.Dispatcher.on('linkClicked', el => {
      const currentStatus = Barba.HistoryManager.currentStatus()
      // this.returnTo = (el ? el.offsetTop : 0)
      this.returnTo = (el ? el.offsetTop : 0)
      if (currentStatus && currentStatus.namespace === 'home') {
        document.body.setAttribute('data-scroll-start', this.returnTo)
      }
    })

    Barba.Dispatcher.on('transitionCompleted', (currentStatus, ps) => {
      document.body.classList.remove('js-is-moving')
      if (currentStatus && currentStatus.namespace === 'home') {
        document.body.scrollTop = parseInt(document.body.getAttribute('data-scroll-start'), 10)
      }
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

