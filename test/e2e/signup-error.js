var ext = require('../../nightwatch.conf.js');

/*
 * Description: it should try and fail to encrypt already encrypted sys wallet
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/signup-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet'));
module.exports = ext.extend(module.exports, require('./module/signup-passphrase'));
module.exports = ext.extend(module.exports, require('./module/signup-passphrase-error'));