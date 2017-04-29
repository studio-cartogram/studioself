const getTransition = function () {
  return Barba.BaseTransition.extend({
    start() {
      console.log('Starting transition')
      Promise.all([
        this.newContainerLoading,
        // _fadeOutItems().finished
        // .then(() => _scrollTop().finished
        // .then(() => this.showCurtain())),
      ])
      .then(this.showNewPage.bind(this))
    },
    showNewPage() {
      console.log('Ending transition')
      this.done()
    },
  })
}

Barba.Pjax.init()
Barba.Prefetch.init()
Barba.Pjax.getTransition = () => {
  const prevView = Barba.HistoryManager.prevStatus().namespace
  return getTransition(prevView)
}
