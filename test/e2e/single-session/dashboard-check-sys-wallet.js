var ext = require('../../../nightwatch.conf.js');

// tests
module.exports = ext.extend(module.exports, require("./login-page-check"));
module.exports = ext.extend(module.exports, require("./add-wallet"));
module.exports = ext.extend(module.exports, require("./signin-dashboard"));
module.exports = ext.extend(module.exports, require("./syscoin-gen-coins"));
module.exports = ext.extend(module.exports, require("./dashboard-check-nonempty-sys-wallet"));