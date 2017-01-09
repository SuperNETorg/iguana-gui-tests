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

module.exports = {
  'test IguanaGUI dashboard mobile mode layout switch': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('signin-to-dashboard-check-mobile-mode');

    var responsiveTest = function(containerToScroll) {
      for (var a=0; a < browser.globals.test_settings.scrollByPoinsCount; a++) {
        for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
          var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ');
          if (viewport[0] < 768 && viewport[1] < 1024) { // resize window only for mobile/tablet like resolutions
            browser
              .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
              .execute(function(container, run) {
                if (container) {
                  var elem = document.querySelector(container);
                  if (run === 0) {
                    if (container === 'window')
                      window.scrollBy(0, document.querySelector('html').offsetHeight * -1);
                    else
                      elem.scrollTop = 0;
                  } else {
                    if (container === 'window')
                      window.scrollBy(0, document.querySelector('html').offsetHeight / run);
                    else
                      elem.scrollTop = Math.floor(document.querySelector(container).offsetHeight / run);
                  }
                }
              }, [containerToScroll, a])
              .saveScreenshot(getScreenshotUrl().replace('{{ res }}', '-scroll-' + a + '-' + browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
          }
        }
      }
    }

    browser
      .resizeWindow(760, 1000)
      .pause(250)
      .verify.urlEquals(conf.iguanaGuiURL + 'index.html#/dashboard-coins')
      .verify.containsText('.balance-block .currency', currency.toUpperCase())
      .verify.containsText('.balance-block .value', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
      // check sidebar values
      .verify.cssClassNotPresent('.account-coins-repeater .sys', 'active')
      .verify.containsText('.account-coins-repeater .sys .name', coinFullName)
      .verify.containsText('.account-coins-repeater .sys .coin-value', coin.toUpperCase())
      .verify.containsText('.account-coins-repeater .sys .coin-value .val', getBalance().toFixed(0))
      .verify.containsText('.account-coins-repeater .sys .currency-value', currency.toUpperCase())
      .verify.containsText('.account-coins-repeater .sys .currency-value .val', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
      .verify.cssClassPresent('.coins .btn-add-coin', 'disabled')
      .pause(10, function() {
        responsiveTest('window')
      })
      .click('.account-coins-repeater .sys')
      .pause(250)
      .verify.cssClassNotPresent('.transactions-unit .action-buttons .btn-send', 'disabled')
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance .value', getBalance().toFixed(0))
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance .coin-name', coin.toUpperCase())
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance-currency .value', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
      .verify.containsText('.transactions-unit .top-bar .active-coin-balance-currency .currency', currency.toUpperCase())
      // the first tx should be of receive category and in process
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
      .resizeWindow(1360, 768)
      .verify.urlEquals(conf.iguanaGuiURL + 'index.html#/dashboard')
  }
};