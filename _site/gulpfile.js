const gulp  = require('gulp')
const gutil = require('gulp-util')

// utils
const validateConfig = require('./gulp/core/utils/validateConfig')
const lazyQuire = require('./gulp/core/utils/lazyQuire')

// config
const themeConfig = require('./theme.config')

// validate the project
// configuration
validateConfig(themeConfig)

// gulpfile booting message
gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'))

/**
 * Grouped
 */
gulp.task('default', [
  'svg:watch',
  'sprite:watch',
  'images:watch',
  'scripts:watch',
  'styles:watch',
  'theme:watch',
  'browser:sync',
])

gulp.task('build', [
  'svg:prod',
  'sprite:prod',
  'images:prod',
  'scripts:prod',
  'styles:prod',
])

gulp.task('compress', [
  'theme:zip',
])


/**
 * Browser
 */
gulp.task('browser:sync', [], lazyQuire(require, './gulp/core/recipes/browser-sync'))


/**
 * Svgs
 */
gulp.task('svg:clean', [], lazyQuire(require, './gulp/core/recipes/svg/clean'))
gulp.task('svg:dev', ['svg:clean'], lazyQuire(require, './gulp/core/recipes/svg/dev'))
gulp.task('svg:prod', ['svg:clean'], lazyQuire(require, './gulp/core/recipes/svg/prod'))
gulp.task('svg:watch', ['svg:dev'], lazyQuire(require, './gulp/core/recipes/svg/watch'))


/**
 * Svg Sprites
 */
gulp.task('sprite:clean', [], lazyQuire(require, './gulp/core/recipes/sprite/clean'))
gulp.task('sprite:dev', ['sprite:clean'], lazyQuire(require, './gulp/core/recipes/sprite/dev'))
gulp.task('sprite:prod', ['sprite:clean'], lazyQuire(require, './gulp/core/recipes/sprite/prod'))
gulp.task('sprite:watch', ['sprite:dev'], lazyQuire(require, './gulp/core/recipes/sprite/watch'))


/**
 * Images
 */
gulp.task('images:clean', [], lazyQuire(require, './gulp/core/recipes/images/clean'))
gulp.task('images:dev', ['images:clean'], lazyQuire(require, './gulp/core/recipes/images/dev'))
gulp.task('images:prod', ['images:clean'], lazyQuire(require, './gulp/core/recipes/images/prod'))
gulp.task('images:watch', ['images:dev'], lazyQuire(require, './gulp/core/recipes/images/watch'))


/**
 * Scripts
 */
gulp.task('scripts:clean', [], lazyQuire(require, './gulp/core/recipes/scripts/clean'))
gulp.task('scripts:dev', ['scripts:clean'], lazyQuire(require, './gulp/core/recipes/scripts/dev'))
gulp.task('scripts:prod', ['scripts:clean'], lazyQuire(require, './gulp/core/recipes/scripts/prod'))
gulp.task('scripts:watch', ['scripts:dev'], lazyQuire(require, './gulp/core/recipes/scripts/watch'))


/**
 * Styles
 */
gulp.task('styles:clean', [], lazyQuire(require, './gulp/core/recipes/styles/clean'))
gulp.task('styles:dev', ['styles:clean'], lazyQuire(require, './gulp/core/recipes/styles/dev'))
gulp.task('styles:prod', ['styles:clean'], lazyQuire(require, './gulp/core/recipes/styles/prod'))
gulp.task('styles:watch', ['styles:dev'], lazyQuire(require, './gulp/core/recipes/styles/watch'))


/**
 * Theme
 */
gulp.task('theme:dev', [], lazyQuire(require, './gulp/core/recipes/theme/dev'))
gulp.task('theme:watch', ['theme:dev'], lazyQuire(require, './gulp/core/recipes/theme/watch'))
gulp.task('theme:zip', [], lazyQuire(require, './gulp/core/recipes/theme/zip'))
