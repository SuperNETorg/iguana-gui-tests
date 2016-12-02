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
    coin = 'doge',
    genSysVal = 20500000, // TODO: read from getbalance rpc output
    coinFullName = 'Dogecoin',
    txData,
    defaultAddress;

function getScreenshotUrl() {
  step++;
  return 'screenshots/dashboard-check-nonempty-doge-wallet-' + step +'.png';
}

function getTx() {
  return JSON.parse(fs.readFileSync('listtransactions-doge.txt', 'utf-8'))[0]; // tx are in default order while in ui they're in reverse
}

module.exports = {
  'test IguanaGUI check dashboard w/ non-empty doge wallet': function(browser) {
    browser
      .verify.containsText('.balance-block .currency', currency.toUpperCase())
    browser // check sidebar values
      .pause('3000')
      .click('.account-coins-repeater .doge')
      .pause('3000')
      .verify.cssClassPresent('.account-coins-repeater .doge', 'active')
      .verify.containsText('.account-coins-repeater .doge .name', coinFullName)
      .verify.containsText('.account-coins-repeater .doge .coin-value', coin.toUpperCase())
      .verify.containsText('.account-coins-repeater .doge .coin-value .val', genSysVal)
      .verify.containsText('.account-coins-repeater .doge .currency-value', currency.toUpperCase())
      // check transaction unit balances
      .verify.cssClassNotPresent('.transactions-unit .action-buttons .btn-send', 'disabled')
      .waitForElementNotPresent('.transactions-unit .top-bar .loader')
      .waitForElementNotPresent('.transactions-unit .transactions-list .loader')
      // the first tx should be of receive category and in process
      .waitForElementVisible('.transactions-list-repeater .item:first-child')
      .verify.cssClassPresent('.transactions-list-repeater .item:first-child', 'process')
      .verify.cssClassPresent('.transactions-list-repeater .item:first-child div:nth-child(3)', 'progress-status')
      .verify.containsText('.transactions-list-repeater .item:first-child .status', 'In Process')
      .verify.containsText('.transactions-list-repeater .item:first-child .amount .value', getTx().amount)
      .verify.containsText('.transactions-list-repeater .item:first-child .amount .coin-name', coin.toUpperCase())
      .verify.containsText('.transactions-list-repeater .item:first-child .hash', getTx().address)
      .pause('1000')
      .url(iguanaGUIFolder + 'index.html#/login')
      .pause('3000')
      .verify.cssClassPresent('.coins .btn-add-coin', 'disabled')
      .saveScreenshot(getScreenshotUrl())
  }
};