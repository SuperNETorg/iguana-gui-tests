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
  'test IguanaGUI dashboard send coin modal': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('dashboard-send-coin-sys');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
      }
    }

    browser
      .pause(1000)
      .click('.transactions-unit .action-buttons .btn-send')
      .waitForElementVisible('.modal-send-coin .form-header .title')
      .setValue('.modal-send-coin .tx-address', getAddress().trim())
      .setValue('.modal-send-coin .tx-amount', 10)
      .setValue('.modal-send-coin .tx-fee', 1)
      .setValue('.modal-send-coin .tx-note', 'iguana test suite automated send coin')
      .pause(10, function() {
        responsiveTest()
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
        responsiveTest()
      })
      .click('.modal-send-coin .btn-confirm-tx')
      .waitForElementVisible('.send-coin-confirm-passphrase .form-header .title')
      .verify.containsText('.send-coin-confirm-passphrase .form-header .title', 'Provide passphrase')
      .verify.cssClassPresent('.send-coin-confirm-passphrase .btn-add-wallet', 'disabled')
      .setValue('.send-coin-confirm-passphrase #passphrase', '1234 1234')
      .click('.send-coin-confirm-passphrase .btn-add-wallet')
      .waitForElementPresent('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-red')
      .verify.containsText('.msg-body span', 'Wrong passphrase')
      .pause(10, function() {
        responsiveTest()
      })
      .keys(browser.Keys.ESCAPE)
      .waitForElementNotPresent('.iguana-modal')
      .clearValue('.send-coin-confirm-passphrase #passphrase')
      .setValue('.send-coin-confirm-passphrase #passphrase', 'test test')
      .pause(10, function() {
        responsiveTest()
      })
      .click('.send-coin-confirm-passphrase .btn-add-wallet')
      .waitForElementNotPresent('.send-coin-confirm-passphrase')
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