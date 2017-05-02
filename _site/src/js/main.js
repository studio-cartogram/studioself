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
    Barba.Pjax.init()
    Barba.Prefetch.init()
    Barba.Pjax.getTransition = () =>  this.Transition
  }

  init = () => {
    this.curtainEl = document.getElementById('js-curtain')
    this.curtain = new Curtain(this.curtainEl)
    this.scroll = new Scroll()
    this.fade = new Fade()
    this.initTransitions()
    imagesLoaded( document.querySelector('#js-main'), instance => {
      document.body.classList.remove('js-is-loading')
      log('images loaded')
      this.curtain.hide()
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
    const _showCurtain = this.curtain.show.bind(this)
    const _hideCurtain = this.curtain.hide.bind(this)
    // const _fadeOut = this.fade.fadeOut.bind(this)
    // const _fadeIn = this.fade.fadeIn.bind(this)

    this.Transition = Barba.BaseTransition.extend({
      start() {
        Promise
        .all([
          // _fadeOut(this.oldContainer).finished,
          this.newContainerLoading,
          this.showCurtain(),
          _scrollTop().finished,
        ])
        .then(this.showNewPage.bind(this))
      },

      showCurtain() {
        const deferred = Barba.Utils.deferred()
        _showCurtain(() => {
          deferred.resolve()
        })

        return deferred.promise
      },

      showNewPage() {
        // _fadeIn(this.newContainer)
        _hideCurtain(() => {
          this.done()
        })
      },
    })
  }
}

const app = new App()

window.app = app

