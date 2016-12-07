var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    currency = 'usd',
    coin = 'sys',
    coinFullName = 'Syscoin';

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
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('dashboard-receve-coin-sys');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
      }
    }

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
        responsiveTest()
      })
      .keys(browser.Keys.ESCAPE)
    browser.expect.element('.receiving-coin-content #qrcode img').to.have.attribute('src').which.contains('data:image/png;base64,')
    browser
      .pause(2000)
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['100'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', Number(usdCurrencyRate().SYS.USD * 100).toFixed(2))
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['1000'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', Number(usdCurrencyRate().SYS.USD * 1000).toFixed(2))
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['0'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', '')
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['-100'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', 0)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['abc'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', 0)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['=$#;,'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency', 0)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['001'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency-coin', 0.1)
      .clearValue('.receiving-coin-content .crypto-currency.currency-coin')
      .setValue('.receiving-coin-content .crypto-currency.currency-coin', ['10.01'])
      .pause(10, function() {
        responsiveTest()
      })
      .pause(250)
      .verify.valueContains('.receiving-coin-content .crypto-currency.currency-coin', 10.01)
      .keys(browser.Keys.ESCAPE)
      .waitForElementNotPresent('.receiving-coin-content')
  }
};