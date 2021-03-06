var ext = require('../../nightwatch.conf.js');

/*
 * Description: test iguana signup flow
 *
 */

// tests
module.exports = ext.extend(module.exports, require('./module/login-page-check'));
module.exports = ext.extend(module.exports, require('./module/add-wallet-signup-iguana'));
module.exports = ext.extend(module.exports, require('./module/iguana-signup-page-check'));
module.exports = ext.extend(module.exports, require('./module/signup-passphrase'));
module.exports = ext.extend(module.exports, require('./module/iguana-signup-passphrase-success'));
module.exports = ext.extend(module.exports, require('./module/close-browser.js'));