var ext = require('../../nightwatch.conf.js');

/*
 * Description:
 *   1) login into test sys wallet
 *   2) gen sys tx
 *   3) check sys wallet tx and balances
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet'));
module.exports = ext.extend(module.exports, require('./module/signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/syscoin-gen-coins'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-nonempty-sys-wallet'));