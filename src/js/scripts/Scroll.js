import anime from 'animejs'

import {
  TRANSITION_DURATION,
} from '../config'

class Scroll {
  createScrollConfig = ({
    container,
    start,
    end,
  }) => {
    const _container = container
    const position = {
      start,
    }
    return {
      targets: position,
      start: end,
      duration: TRANSITION_DURATION,
      easing: 'easeInExpo',
      round: 1,
      update: () => {
        _container.scrollTop = position.start
      },
    }
  }

  scrollTo = (target, offset = 0) => {
    const container = document.body
    const config = this.createScrollConfig({
      container,
      start: container.scrollTop,
      end: target.offsetTop - offset,
    })

    return anime({
      ...config,
    })
  }

  scrollTop = () => {
    const container = document.body
    const config = this.createScrollConfig({
      container,
      start: container.scrollTop,
      end: 0,
    })

    return anime({
      ...config,
    })
  }
}

export default Scroll

