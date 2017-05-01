const once = (elem, type, handler) => {
  const fn = e => {
    e.target.removeEventListener(type, fn)
    if (handler && typeof handler === 'function') { handler.call() }
  }
  elem.addEventListener(type, fn)
}

export default once
