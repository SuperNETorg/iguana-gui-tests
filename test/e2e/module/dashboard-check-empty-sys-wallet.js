var conf = require('../../../nightwatch.conf.js'),
    currency = 'usd',
    coin = 'sys',
    coinFullName = 'Syscoin';

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('dashboard-check-empty-sys-wallet');

module.exports = {
  'test IguanaGUI dashboard w/ empty sys wallet': function(browser) {
    browser
      .verify.containsText('.balance-block .currency', currency.toUpperCase())
      .verify.containsText('.balance-block .value', 0)
    browser
      .verify.cssClassPresent('.account-coins-repeater .sys', 'active')
      .verify.containsText('.account-coins-repeater .sys .name', coinFullName)
      .verify.containsText('.account-coins-repeater .sys .coin-value', coin.toUpperCase())
      .verify.containsText('.account-coins-repeater .sys .coin-value .val', 0)
      .verify.containsText('.account-coins-repeater .sys .currency-value', currency.toUpperCase())
      .verify.containsText('.account-coins-repeater .sys .currency-value .val', 0)
    browser
      .verify.cssClassPresent('.coins .btn-add-coin', 'disabled')
      .verify.cssClassPresent('.transactions-unit .action-buttons .btn-send', 'disabled')
      .waitForElementVisible('.transactions-unit .top-bar .loader')
      .waitForElementVisible('.transactions-unit .transactions-list .loader')
  }
};