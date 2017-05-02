const gulp = require('gulp')
const watch = require('gulp-watch')

// config
const config = require('../../config/images')


/**
 * Watch image files
 * for changes
 *
 * @param done
 */
module.exports = function (done) {
  watch(config.paths.watch, () => {
    gulp.start('images:dev')
  })

  done()
}
