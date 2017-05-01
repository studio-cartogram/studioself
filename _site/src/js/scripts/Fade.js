import anime from 'animejs'

import {
  TRANSITION_DURATION,
} from './../config'

class Fade {
  createFadeConfig = (targets, direction) => ({
    targets,
    duration: TRANSITION_DURATION,
    easing: 'easeOutQuint',
    opacity: direction === 'in' ? [0, 1] : [1, 0],
    translateY: direction === 'in' ? [200, 0] : [0, 0],
  })

  fadeOut = el => {
    const config = this.createFadeConfig(el, 'out')
    return anime({
      ...config,
    })
  }

  fadeIn = el => {
    const config = this.createFadeConfig(el, 'in')
    return anime({
      ...config,
    })
  }
}

export default Fade

