// utils
const deepMerge = require('../utils/deepMerge')

// config
const overrides = require('../../config/common')

/**
 * Common config
 * for all tasks
 *
 */

module.exports = deepMerge({
  paths: {
    theme: {
      src: 'templates',
    },
    assets: {
      src: 'src',
      dest: 'assets',
    },
  },
}, overrides)
