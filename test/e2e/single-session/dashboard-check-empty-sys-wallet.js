var conf = require('../../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/',
    step = -1,
    chalk = require('chalk'),
    util = require('util'),
    fs = require('fs'),
    generatedPassphraseText,
    exec = require('child_process').exec,
    child,
    currency = 'usd',
    coin = 'sys',
    coinFullName = 'Syscoin';

function getScreenshotUrl() {
  step++;
  return 'screenshots/dashboard-check-empty-sys-wallet' + step +'.png';
}

module.exports = {
  'test IguanaGUI check dashboard w/ empty sys wallet': function(browser) {
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