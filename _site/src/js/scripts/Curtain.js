import once from '../utils/once'

class Curtain {
  constructor(el) {
    if (!el) return null
    this.curtain = el
    // this.swoosh = el.querySelector('.js-curtain__swoosh')
    el.addEventListener('click', this.hide)
  }

  show = onComplete => {
    document.body.classList.add('curtain--is-shown')
    // once(this.swoosh, 'animationend', () => {
    //   if (onComplete && typeof onComplete === 'function') {
    //     onComplete()
    //   }
    // })
  }

  hide = onComplete => {
    document.body.classList.remove('curtain--is-shown')
    // once(this.swoosh, 'animationend', () => {
    //   document.body.classList.remove('curtain--is-shown')
    //   document.body.classList.remove('curtain--is-hidden')
    //   if (onComplete && typeof onComplete === 'function') {
    //     onComplete()
    //   }
    // })
  }
}

export default Curtain
