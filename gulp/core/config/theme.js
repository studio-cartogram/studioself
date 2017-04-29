// utils
const deepMerge = require('../utils/deepMerge')

// config
const overrides = require('../../config/theme')
const paths = require('./common').paths
const theme = paths.theme

/**
 * Theme Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
  paths: {
    watch: `${theme.src}/**/*.{json,liquid,php,png,jpg}`,
    src: `${theme.src}/**/*.{json,liquid,php,png,jpg}`,
  },
}, overrides)
