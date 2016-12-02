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
    genSysVal = 474200578, // TODO: read from getbalance rpc output
    coinFullName = 'Syscoin',
    txData,
    defaultAddress;

function getScreenshotUrl() {
  step++;
  return 'screenshots/dashboard-check-nonempty-sys-wallet-' + step +'.png';
}

function getTx() {
  return JSON.parse(fs.readFileSync('listtransactions-sys.txt', 'utf-8'))[0];
}

module.exports = {
  'test IguanaGUI check dashboard w/ empty sys wallet': function(browser) {
    browser
      .verify.containsText('.balance-block .currency', currency.toUpperCase())
    browser // check sidebar values
      .verify.cssClassPresent('.account-coins-repeater .sys', 'active')
      .verify.containsText('.account-coins-repeater .sys .name', coinFullName)
      .verify.containsText('.account-coins-repeater .sys .coin-value', coin.toUpperCase())
      .verify.containsText('.account-coins-repeater .sys .coin-value .val', genSysVal)
      .verify.containsText('.account-coins-repeater .sys .currency-value', currency.toUpperCase())
    browser // check transaction unit balances
      .verify.cssClassPresent('.coins .btn-add-coin', 'disabled')
      .verify.cssClassNotPresent('.transactions-unit .action-buttons .btn-send', 'disabled')
      .waitForElementNotPresent('.transactions-unit .top-bar .loader')
      .waitForElementNotPresent('.transactions-unit .transactions-list .loader')
    browser // the first tx should be of receive category and in process
      .waitForElementVisible('.transactions-list-repeater .item:first-child')
      .verify.cssClassPresent('.transactions-list-repeater .item:first-child', 'process')
      .verify.cssClassPresent('.transactions-list-repeater .item:first-child div:nth-child(3)', 'progress-status')
      .verify.containsText('.transactions-list-repeater .item:first-child .status', 'In Process')
      .verify.containsText('.transactions-list-repeater .item:first-child .amount .value', getTx().amount)
      .verify.containsText('.transactions-list-repeater .item:first-child .amount .coin-name', coin.toUpperCase())
      .verify.containsText('.transactions-list-repeater .item:first-child .hash', getTx().address)
      .saveScreenshot(getScreenshotUrl())
  }
};