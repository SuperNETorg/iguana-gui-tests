var ext = require('../../nightwatch.conf.js');

/*
 * Description: login into test iguana/sys wallet
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet'));
module.exports = ext.extend(module.exports, require('./module/iguana-signin-dashboard.js'));
module.exports = ext.extend(module.exports, require('./module/iguana-dashboard-check-empty-sys-wallet'));