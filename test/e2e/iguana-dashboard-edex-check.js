var ext = require('../../nightwatch.conf.js');

/*
 * Description: 1) login into test iguana/sys wallet
 *              2) check edex gui transition
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet-iguana'));
module.exports = ext.extend(module.exports, require('./module/iguana-signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/dashboard-check-edex-tab-iguana'));
module.exports = ext.extend(module.exports, require('./module/close-browser.js'));