var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    currency = 'usd',
    coin = 'sys',
    coinFullName = 'Syscoin',
    testName = 'iguana-dashboard-send-coin-sys';

function getAddress() {
  return fs.readFileSync('temp/accountaddress-sys.txt', 'utf-8');
}

function usdCurrencyRate() {
  return JSON.parse(fs.readFileSync('temp/sys-doge-rate.txt', 'utf-8'));
}

function getBalance() {
  return Number(fs.readFileSync('temp/getbalance-sys.txt', 'utf-8'));
}

module.exports = {
  'test IguanaGUI dashboard send coin modal': function(browser) {

    browser
      .pause(1000)
      .click('.transactions-unit .action-buttons .btn-send')
      .waitForElementVisible('.modal-send-coin .form-header .title')
      .setValue('.modal-send-coin .tx-address', getAddress().trim())
      .setValue('.modal-send-coin .tx-amount', 10)
      .setValue('.modal-send-coin .tx-fee', 1)
      .setValue('.modal-send-coin .tx-note', 'iguana test suite automated send coin')
      .pause(10, function() {
        conf.responsiveTest('.send-coin-modal-container .modal-content', testName, browser)
      })
      .pause(250)
      .click('.modal-send-coin .btn-next')
      .waitForElementVisible('.modal-send-coin .btn-confirm-tx')
      .verify.containsText('.modal-send-coin .pop-detail.send.check p', getAddress().trim())
      .verify.containsText('.modal-send-coin .pop-detail.crncy.chk-crncy.crncy-rs h3', 10 + ' ' + coin.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.crncy.chk-crncy.crncy-rs h5', Number(10 * usdCurrencyRate().SYS.USD).toFixed(3) + ' ' + currency.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.crncy.chk-crncy.crncy-fee h3', 1 + ' ' + coin.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.crncy.chk-crncy.crncy-fee h5', Number(1 * usdCurrencyRate().SYS.USD).toFixed(4)) //+ ' ' + currency.toUpperCase())
      .verify.containsText('.modal-send-coin .btn-confirm-tx', 'Send ' + 10 + ' ' + coin.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.pay-dtl p', 'iguana test suite automated send coin')
      .pause(10, function() {
        conf.responsiveTest('.send-coin-modal-container .modal-content', testName, browser)
      })
      .click('.modal-send-coin .btn-confirm-tx')
      // regtest responds with an error on sendtoaddress
      // assume that tx was sent
      .keys(browser.Keys.ESCAPE)
      .waitForElementNotPresent('.modal-send-coin')
      .url(conf.iguanaGuiURL + 'index.html#/dashboard')
      // check spent and received transactions
      .waitForElementVisible('.transactions-list-repeater .item:nth-child(19)')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(19)', 'process')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(19) div:nth-child(3)', 'progress-status')
      .verify.containsText('.transactions-list-repeater .item:nth-child(19) .status', 'Received')
      .verify.containsText('.transactions-list-repeater .item:nth-child(19) .amount .value', 10)
      .verify.containsText('.transactions-list-repeater .item:nth-child(19) .amount .coin-name', coin.toUpperCase())
      .waitForElementVisible('.transactions-list-repeater .item:nth-child(20)')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(20)', 'process')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(20) div:nth-child(3)', 'progress-status')
      .verify.containsText('.transactions-list-repeater .item:nth-child(20) .status', 'Sent')
      .verify.containsText('.transactions-list-repeater .item:nth-child(20) .amount .value', 10)
      .verify.containsText('.transactions-list-repeater .item:nth-child(20) .amount .coin-name', coin.toUpperCase())
  }
};