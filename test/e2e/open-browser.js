var ext = require('../../nightwatch.conf.js');

/*
 * Description: open browser session
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));