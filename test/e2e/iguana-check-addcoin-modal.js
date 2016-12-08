var ext = require('../../nightwatch.conf.js');

/*
 * Description: test iguana add coin modal
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/iguana-check-addcoin-modal'));