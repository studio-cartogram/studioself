const gutil = require('gulp-util')
const notifier = require('node-notifier')


/**
 * Fake the gulp-notfy functionality
 * to provide a consistent interface
 * for non-stream notifications
 *
 * @param message
 */
module.exports = function notifaker(message) {
  gutil.log(
    gutil.colors.cyan('gulp-notifier'),
    `[${gutil.colors.blue('Gulp notification')}]`,
    gutil.colors.green(message)
  )

  notifier.notify({
    title: 'Gulp notification',
    message,
    onLast: true,
  })
}
