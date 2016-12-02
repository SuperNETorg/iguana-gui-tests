var ext = require('../../../nightwatch.conf.js');

/*
 * Description: it should try and fail to encrypt already encrypted sys wallet
 *
 */

// tests
module.exports = ext.extend(module.exports, require("./login-page-check"));
module.exports = ext.extend(module.exports, require("./signup-page-check"));
module.exports = ext.extend(module.exports, require("./add-wallet"));
module.exports = ext.extend(module.exports, require("./signup-passphrase"));
module.exports = ext.extend(module.exports, require("./signup-passphrase-error"));