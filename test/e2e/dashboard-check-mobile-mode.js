var ext = require('../../nightwatch.conf.js');

/*
 * Description:
 *   1) login into test sys wallet
 *   2) gen sys tx
 *   3) check mobile mode layout switch
 */

// tests
module.exports = ext.extend(module.exports, require('./module/get-coin-to-currency-rate'));
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet'));
module.exports = ext.extend(module.exports, require('./module/signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/syscoin-gen-coins'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-mobile-mode'));