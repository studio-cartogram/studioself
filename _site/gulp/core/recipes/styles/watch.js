const gulp = require('gulp')
const watch = require('gulp-watch')

// config
const config = require('../../config/styles')


/**
 * Watch style files
 * for changes
 *
 * @param done
 */
module.exports = function (done) {
  watch(config.paths.watch, () => {
    gulp.start('styles:dev')
  })

  done()
}
