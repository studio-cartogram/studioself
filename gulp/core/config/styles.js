// utils
const deepMerge = require('../utils/deepMerge')

// config
const overrides = require('../../config/styles')
const paths = require('./common').paths

/**
 * Style Building
 * Configuration
 * Object
 *
 * @type {{}}
 */

module.exports = deepMerge({
  paths: {
    watch: [
      `${paths.theme.src}/_sass/**/*.scss`,
      `!${paths.theme.src}/_sass/**/*_tmp\\d+.scss`,
    ],
    src: [
      `${paths.theme.src}/_sass/**/*.scss`,
      `!${paths.theme.src}/_sass/**/*_tmp\\d+.scss`,
    ]
  },
}, overrides)
