var ext = require('../../nightwatch.conf.js');

/*
 * Description:
 *   1) login into test sys wallet
 *   2) change currency
 *   3) check currency change is reflected
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet'));
module.exports = ext.extend(module.exports, require('./module/signin-dashboard'));
module.exports = ext.extend(module.exports, require('./module/change-currency'));
module.exports = ext.extend(module.exports, require('./module/close-browser.js'));