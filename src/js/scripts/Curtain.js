import once from '../utils/once'

class Curtain {
  constructor(el) {
    if (!el) return null
    this.curtain = el
    // this.swoosh = el.querySelector('.js-curtain__swoosh')
    el.addEventListener('click', this.hide)
    setTimeout(() => document.addEventListener('scroll', this.hide), 100)
  }

  isCurtainShown() {
    return !!document.body.classList.contains('curtain--is-shown')
  }

  show = onComplete => {
    document.body.classList.add('curtain--is-shown')
  }

  hide = onComplete => {
    if(this.isCurtainShown()) {
      document.body.classList.remove('curtain--is-shown')
    }
  }
}

export default Curtain
