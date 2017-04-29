const gulp = require('gulp')
const browserSync = require('browser-sync')

// config
const config = require('../../config/theme')

/**
 * Move the Theme to
 * reolad the browser
 * snippet
 *
 * @returns {*}
 */
module.exports = function () {
  return gulp.src(config.paths.src)
  .on('end', browserSync.reload)
}
