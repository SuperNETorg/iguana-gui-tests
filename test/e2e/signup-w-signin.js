var ext = require('../../../nightwatch.conf.js');

/*
 * Description:
 *   1) encrypt sys wallet w/ 12 word random passphrase
 *   2) login into sys wallet
 */

// tests
module.exports = ext.extend(module.exports, require('./module/signup-success'));
module.exports = ext.extend(module.exports, require('./module/add-wallet-2nd-time'));
module.exports = ext.extend(module.exports, require('./module/signup-signin-after-wallet-encrypt'));