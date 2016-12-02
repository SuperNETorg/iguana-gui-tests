var ext = require('../../../nightwatch.conf.js');

// tests
module.exports = ext.extend(module.exports, require("./login-page-check"));
module.exports = ext.extend(module.exports, require("./add-wallet"));