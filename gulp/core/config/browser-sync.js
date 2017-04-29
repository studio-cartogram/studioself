// utils
const deepMerge = require('../utils/deepMerge')

// config
const overrides = require('../../config/browser-sync')
const themeConfig = require('../../../theme.config')

/**
 * BrowserSync
 * configuration
 * object
 *
 */

module.exports = deepMerge({
  logSnippet: false,
  ghostMode: false,
  open: false,
  proxy: themeConfig.devURI,
}, overrides)
