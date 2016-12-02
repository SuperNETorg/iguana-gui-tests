var extend = function(target) {
  var sources = [].slice.call(arguments, 1);

  sources.forEach(function(source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });

  return target;
};

/*
 * Description: it should encrypt unencrypted sys wallet
 *
 */

// tests
module.exports = extend(module.exports, require("./login-page-check"));
module.exports = extend(module.exports, require("./signup-page-check"));
module.exports = extend(module.exports, require("./add-wallet"));
module.exports = extend(module.exports, require("./signup-passphrase"));
module.exports = extend(module.exports, require("./signup-passphrase-success"));