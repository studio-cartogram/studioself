const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const browserSync = require('browser-sync')

// utils
const pumped = require('../../utils/pumped')

// config
const config = require('../../config/styles.js')

/**
 * Compile SCSS to CSS,
 * create Sourcemaps
 * and trigger
 * Browser-sync
 *
 *
 */
module.exports = function () {
  return gulp.src(config.paths.src)
  .pipe(plumber())
  .pipe(browserSync.reload({ stream: true }))

  .pipe(notify({
    message: pumped('SCSS Changed.'),
    onLast: true,
  }))
}
