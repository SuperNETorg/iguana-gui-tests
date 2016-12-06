var ext = require('../../nightwatch.conf.js');

/*
 * Description:
 *  1) login into test iguana/sys coin
 *  2) add doge coin
 */

// tests
module.exports = ext.extend(module.exports, require("./iguana-signin"));
module.exports = ext.extend(module.exports, require("./module/iguana-add-doge-coin-dashboard"));