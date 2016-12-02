var extend = function(target) {
  var sources = [].slice.call(arguments, 1);

  sources.forEach(function(source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });

  return target;
};

// tests
module.exports = extend(module.exports, require('./login-page-check'));
module.exports = extend(module.exports, require('./add-wallet'));
module.exports = extend(module.exports, require('./signin-dashboard'));
module.exports = extend(module.exports, require('./add-wallet-doge-dashboard'));
module.exports = extend(module.exports, require('./syscoin-gen-coins'));
module.exports = extend(module.exports, require("./dashboard-check-nonempty-sys-wallet"));
module.exports = extend(module.exports, require('./dogecoin-gen-coins'));
module.exports = extend(module.exports, require("./dashboard-check-nonempty-doge-wallet"));