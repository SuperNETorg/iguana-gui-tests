var ext = require('../../nightwatch.conf.js');

/*
 * Description:
 *  1) login into test iguana/sys coin
 *  2) send sys coin
 */

// tests
module.exports = ext.extend(module.exports, require('./module/get-coin-to-currency-rate'));
module.exports = ext.extend(module.exports, require('./iguana-signin'));
module.exports = ext.extend(module.exports, require('./module/syscoin-gen-coins'));
module.exports = ext.extend(module.exports, require('./module/iguana-dashboard-send-coin-entry'));