const gulp = require('gulp')
const watch = require('gulp-watch')

// config
const config = require('../../config/sprite')


/**
 * Watch svg sprite files
 * for changes
 *
 * @param done
 */
module.exports = function (done) {
  watch(config.paths.watch, () => {
    gulp.start('sprite:dev')
  })

  done()
}
