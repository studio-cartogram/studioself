const gutil = require('gulp-util')

let callingDone = false
const defaultStatsOptions = {
  colors: gutil.colors.supportsColor,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false,
}

/**
 * Output stats to console for webpack
 *
 * @param err
 * @param stats
 * @param options
 */
module.exports = function logs(err, _stats, _options) {
  const stats = _stats || {}
  const options = _options || {}

  if (options.quiet || callingDone) {
    return
  }

  // Debounce output a little for when in watch mode
  if (options.watch) {
    callingDone = true
    setTimeout(() => {
      callingDone = false
    }, 500)
  }

  if (options.verbose) {
    gutil.log(stats.toString({
      colors: gutil.colors.supportsColor,
    }))
  } else {
    const statsOptions = options && options.stats || {} // eslint-disable-line no-mixed-operators

    Object.keys(defaultStatsOptions).forEach((key) => {
      if (typeof statsOptions[key] === 'undefined') {
        statsOptions[key] = defaultStatsOptions[key]
      }
    })

    gutil.log(stats.toString(statsOptions))
  }
}
