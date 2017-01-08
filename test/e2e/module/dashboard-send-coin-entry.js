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

    var responsiveTest = function(containerToScroll) {
      for (var a=0; a < browser.globals.test_settings.scrollByPoinsCount; a++) {
        for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
          var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
          browser
            .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
            .execute(function(container, run) {
              if (container) {
                var elem = document.querySelector(container);
                if (run === 0) {
                  if (container === 'window')
                    window.scrollBy(0, document.querySelector('body').offsetHeight * -1);
                  else
                    elem.scrollTop = 0;
                } else {
                  if (container === 'window')
                    window.scrollBy(0, document.querySelector('body').offsetHeight / run);
                  else
                    elem.scrollTop = Math.floor(document.querySelector(container).offsetHeight / run);
                }
              }
            }, [containerToScroll, a])
            .saveScreenshot(getScreenshotUrl().replace('{{ res }}', '-scroll-' + a + '-' + browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
        }
      }
    }

    browser
      .pause(1000)
      .click('.transactions-unit .action-buttons .btn-send')
      .waitForElementVisible('.modal-send-coin .form-header .title')
      .pause(1000)
      .clearValue('.modal-send-coin .tx-address')
      .clearValue('.modal-send-coin .tx-amount')
      .clearValue('.modal-send-coin .tx-amount-currency')
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .clearValue('.modal-send-coin .tx-note')
      .setValue('.modal-send-coin .tx-address', getAddress().trim())
      .setValue('.modal-send-coin .tx-amount', 10)
      .setValue('.modal-send-coin .tx-fee', 1)
      .setValue('.modal-send-coin .tx-note', 'iguana test suite automated send coin')
      .pause(10, function() {
        console.log(getAddress().trim())
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .pause(250)
      .click('.modal-send-coin .btn-next')
      .waitForElementVisible('.modal-send-coin .btn-confirm-tx')
      .verify.containsText('.modal-send-coin .pop-detail.send.check p', getAddress().trim())
      .verify.containsText('.modal-send-coin .pop-detail.crncy.chk-crncy.crncy-rs h3', 10 + ' ' + coin.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.crncy.chk-crncy.crncy-rs h5', Number(10 * usdCurrencyRate().SYS.USD).toFixed(5) + ' ' + currency.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.pay-dtl h3', 1 + ' ' + coin.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.pay-dtl h5', Number(1 * usdCurrencyRate().SYS.USD).toFixed(12) + ' ' + currency.toUpperCase())
      .verify.containsText('.modal-send-coin .btn-confirm-tx', 'Send ' + 10 + ' ' + coin.toUpperCase())
      .verify.containsText('.modal-send-coin .pop-detail.pay-dtl p', 'iguana test suite automated send coin')
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .click('.modal-send-coin .btn-confirm-tx')
      .waitForElementVisible('.send-coin-confirm-passphrase .form-header .title')
      .verify.containsText('.send-coin-confirm-passphrase .form-header .title', 'Provide passphrase')
      .clearValue('.send-coin-confirm-passphrase #passphrase')
      .verify.cssClassPresent('.send-coin-confirm-passphrase .btn-add-wallet', 'disabled')
      .setValue('.send-coin-confirm-passphrase #passphrase', '1234 1234')
      .click('.send-coin-confirm-passphrase .btn-add-wallet')
      .waitForElementPresent('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-red')
      .verify.containsText('.msg-body span', 'Incorrect input. Check it try one more time')
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .keys(browser.Keys.ESCAPE)
      .pause(2000)
      .waitForElementNotPresent('.iguana-modal')
      .click('.modal-send-coin .btn-confirm-tx')
      .waitForElementVisible('.send-coin-confirm-passphrase .form-header .title')
      .clearValue('.send-coin-confirm-passphrase #passphrase')
      .setValue('.send-coin-confirm-passphrase #passphrase', 'test test')
      .pause(10, function() {
        responsiveTest('.send-coin-passphrase-modal-container .modal-content')
      })
      .click('.send-coin-confirm-passphrase .btn-add-wallet')
      .waitForElementNotPresent('.send-coin-confirm-passphrase')
      // regtest responds with an error on sendtoaddress
      // assume that tx was sent
      .keys(browser.Keys.ESCAPE)
      .waitForElementNotPresent('.modal-send-coin')
      .url(conf.iguanaGuiURL + 'index.html#/dashboard')
      // check spent and received transactions
      .waitForElementVisible('.transactions-list-repeater .item:nth-child(1)')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(1)', 'process')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(1) .text-vertical-center div:nth-child(2)', 'progress-status')
      .verify.containsText('.transactions-list-repeater .item:nth-child(1) .status', 'Received')
      .verify.containsText('.transactions-list-repeater .item:nth-child(1) .amount .value', 10)
      .verify.containsText('.transactions-list-repeater .item:nth-child(1) .amount .coin-name', coin.toUpperCase())
      .waitForElementVisible('.transactions-list-repeater .item:nth-child(2)')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(2)', 'process')
      .verify.cssClassPresent('.transactions-list-repeater .item:nth-child(2) .text-vertical-center div:nth-child(2)', 'progress-status')
      .verify.containsText('.transactions-list-repeater .item:nth-child(2) .status', 'Sent')
      .verify.containsText('.transactions-list-repeater .item:nth-child(2) .amount .value', 10)
      .verify.containsText('.transactions-list-repeater .item:nth-child(2) .amount .coin-name', coin.toUpperCase())
  }
};