var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    currency = 'usd',
    coin = 'sys',
    coinFullName = 'Syscoin',
    testName = 'dashboard-receve-coin-sys';

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
  'test IguanaGUI dashboard receive coin modal': function(browser) {

    browser
      .click('.transactions-unit .action-buttons .btn-receive')
      .waitForElementVisible('.receiving-coin-content .form-header .title')
      .verify.containsText('.receiving-coin-content .form-header .title', 'Receiving coins')
      .verify.containsText('.receiving-coin-content #address', getAddress().trim().match(/.{1,4}/g).join(' '))
      .click('.receiving-coin-content .buttons .copy-btn')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-blue')
      .verify.containsText('.msg-body span', 'Address copied to clipboard')
      .verify.containsText('.msg-body span', getAddress().trim())
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0, true)
      })
      .keys(browser.Keys.ESCAPE)
    browser.expect.element('.receiving-coin-content #qrcode img').to.have.attribute('src').which.contains('data:image/png;base64,')
    browser
      .pause(2000)
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['100'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0)
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', Number(usdCurrencyRate().SYS.USD * 100).toFixed(2))
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['1000'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0, true)
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', Number(usdCurrencyRate().SYS.USD * 1000).toFixed(2))
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['0'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0, true)
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', '')
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['-100'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0, true)
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', 0)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['abc'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0, true)
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', 0)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['=$#;,'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0, true)
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', 0)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['001'])
      .pause(250)
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 0, true)
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency-coin', 0.1)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['10.01'])
      .pause(10, function() {
        conf.responsiveTest('.receive-coin-modal-container .modal-content', testName, browser, 1)
      })
      .pause(250)
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency-coin', 10.01)
      .keys(browser.Keys.ESCAPE)
      .waitForElementNotPresent('.receiving-coin-content')
  }
};