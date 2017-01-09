var ext = require('../../nightwatch.conf.js');

/*
 * Description: login into test iguana/sys, doge wallet
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/iguana-signin-add-2-coins'));
module.exports = ext.extend(module.exports, require('./module/iguana-signin-dashboard-2-coins.js'));
module.exports = ext.extend(module.exports, require('./module/iguana-dashboard-check-empty-sys-wallet'));