var ext = require('../../nightwatch.conf.js');

/*
 * Description:
 *   1) login into test sys wallet
 *   2) add test doge wallet from within the dashboard
 *   3) gen sys tx
 *   4) check sys wallet receive coin modal
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet'));
module.exports = ext.extend(module.exports, require('./module/signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/add-wallet-doge-dashboard'));
module.exports = ext.extend(module.exports, require('./module/syscoin-gen-coins'));