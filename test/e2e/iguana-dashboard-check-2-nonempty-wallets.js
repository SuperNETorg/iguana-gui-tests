var ext = require('../../nightwatch.conf.js');

/*
 * Description:
 *   1) login into test sys wallet (iguana)
 *   2) add test doge wallet from within the dashboard
 *   3) gen sys tx
 *   4) check sys wallet tx and balances
 *   5) gen doge tx
 *   6) check doge wallet tx and balances
 */

// tests
module.exports = ext.extend(module.exports, require('./module/get-coin-to-currency-rate'));
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/iguana-signin-add-2-coins'));
module.exports = ext.extend(module.exports, require('./module/signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/iguana-add-doge-coin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/syscoin-gen-coins'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-nonempty-sys-wallet'));
module.exports = ext.extend(module.exports, require('./module/dogecoin-gen-coins'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-nonempty-doge-wallet'));