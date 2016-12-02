var ext = require('../../../nightwatch.conf.js');

/*
 * Description: it should encrypt unencrypted sys wallet
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./login-page-check'));
module.exports = ext.extend(module.exports, require('./signup-page-check'));
module.exports = ext.extend(module.exports, require('./add-wallet'));
module.exports = ext.extend(module.exports, require('./signup-passphrase'));
module.exports = ext.extend(module.exports, require('./signup-passphrase-success'));