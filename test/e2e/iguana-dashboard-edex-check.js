var ext = require('../../nightwatch.conf.js');

/*
 * Description: login into test iguana/sys wallet
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet-iguana'));
module.exports = ext.extend(module.exports, require('./module/iguana-signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-edex-tab-iguana'));