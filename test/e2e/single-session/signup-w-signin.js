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
 * Description:
 *   1) encrypt sys wallet w/ 12 word random passphrase
 *   2) login into sys wallet
 */

// tests
module.exports = extend(module.exports, require("./signup-success"));
module.exports = extend(module.exports, require("./add-wallet-2nd-time"));
module.exports = extend(module.exports, require("./signup-signin-after-wallet-encrypt"));