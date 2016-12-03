var ext = require('../../nightwatch.conf.js');
/*
 * Description:
 *   1) login into test sys wallet
 *   2) add test doge wallet from within the dashboard
 *   3) check empty sys wallet tx and balances
 *   4) gen doge tx
 *   5) check doge wallet tx and balances
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet'));
module.exports = ext.extend(module.exports, require('./module/signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-empty-sys-wallet'));
module.exports = ext.extend(module.exports, require('./module/add-wallet-doge-dashboard'));
module.exports = ext.extend(module.exports, require('./module/dogecoin-gen-coins'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-nonempty-doge-wallet'));