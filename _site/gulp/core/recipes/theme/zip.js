const gulp = require('gulp')
const zip = require('gulp-zip')
const notify = require('gulp-notify')
const browserSync = require('browser-sync')

// utils
const pumped = require('../../utils/pumped')

// config
const themeConfig = require('../../../../theme.config')

/**
 */
module.exports = function () {
  return gulp.src([
    'assets/**/*',
    'preview_images/**/*',
    'templates/**/*',
    'config.yml',
    'meta.yml',
    'variables.yml',
  ], {base: '.'})
  .pipe(zip(`${themeConfig.name}.zip`))
  .pipe(gulp.dest('zips'))
  .pipe(notify({
    message: pumped(`${themeConfig.name}.zip created`),
    onLast: true,
  }))
}
