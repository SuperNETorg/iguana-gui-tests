var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    currency = 'usd',
    coin = 'sys',
    coinFullName = 'Syscoin',
    txData,
    defaultAddress;

function getTx() {
  return JSON.parse(fs.readFileSync('temp/listtransactions-sys.txt', 'utf-8'))[0]; // tx are in default order while in ui they're in reverse
}

function usdCurrencyRate() {
  return JSON.parse(fs.readFileSync('temp/sys-doge-rate.txt', 'utf-8'));
}

function getBalance() {
  return Number(fs.readFileSync('temp/getbalance-sys.txt', 'utf-8'));
}

/*
 *  Note: currency values assertions are likely to fail from time to time. It may happen due to rate change while test sequence is executing.
 *  TODO: add approx assertion to check whether or not currency values are falling under a predictable range of fiat values.
 */

module.exports = {
  'test IguanaGUI dashboard w/ non-empty sys wallet': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('dashboard-check-nonempty-sys-wallet');

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
      .verify.containsText('.balance-block .currency', currency.toUpperCase())
      .verify.containsText('.balance-block .value', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
    browser // check sidebar values
      .verify.cssClassPresent('.account-coins-repeater .sys', 'active')
      .verify.containsText('.account-coins-repeater .sys .name', coinFullName)
      .verify.containsText('.account-coins-repeater .sys .coin-value', coin.toUpperCase())
      .verify.containsText('.account-coins-repeater .sys .coin-value .val', getBalance().toFixed(0))
      .verify.containsText('.account-coins-repeater .sys .currency-value', currency.toUpperCase())
      .verify.containsText('.account-coins-repeater .sys .currency-value .val', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
    browser // check transaction unit balances
      .verify.cssClassPresent('.coins .btn-add-coin', 'disabled')
      .verify.cssClassNotPresent('.transactions-unit .action-buttons .btn-send', 'disabled')
      .waitForElementNotPresent('.transactions-unit .top-bar .loader')
      .waitForElementNotPresent('.transactions-unit .transactions-list .loader')
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance .value', getBalance().toFixed(0))
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance .coin-name', coin.toUpperCase())
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance-currency .value', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance-currency .currency', currency.toUpperCase())
    browser // the first tx should be of receive category and in process
      .waitForElementVisible('.transactions-list-repeater .item:first-child')
      .verify.cssClassPresent('.transactions-list-repeater .item:first-child', 'process')
      .verify.cssClassPresent('.transactions-list-repeater .item:first-child .text-vertical-center div:nth-child(2)', 'progress-status')
      .verify.containsText('.transactions-list-repeater .item:first-child .status', 'In Process')
      .verify.containsText('.transactions-list-repeater .item:first-child .amount .value', getTx().amount)
      .verify.containsText('.transactions-list-repeater .item:first-child .amount .coin-name', coin.toUpperCase())
      .verify.containsText('.transactions-list-repeater .item:first-child .hash', getTx().address)
      .pause(10, function() {
        responsiveTest('window')
      })
  }
};