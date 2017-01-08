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
    })('dashboard-send-coin-sys-fields');

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
      .click('.transactions-unit .action-buttons .btn-send')
      .waitForElementVisible('.modal-send-coin .form-header .title')
      .pause(2000)
      .clearValue('.modal-send-coin .tx-address')
      .clearValue('.modal-send-coin .tx-amount')
      .clearValue('.modal-send-coin .tx-amount-currency')
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .clearValue('.modal-send-coin .tx-note')
      .verify.containsText('.modal-send-coin .form-header .title', 'Sending')
      .verify.containsText('.modal-send-coin .headd .name', coinFullName)
      .verify.containsText('.modal-send-coin .balance .balance-coin .value', getBalance().toFixed(0))
      .verify.containsText('.modal-send-coin .balance .balance-coin .name', coin.toUpperCase())
      .verify.containsText('.modal-send-coin .balance .balance-currency .value', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
      .verify.containsText('.modal-send-coin .balance .balance-currency .name', currency.toUpperCase())
      // submit empty form
      .click('.modal-send-coin .btn-next')
      .pause(250)
      // check errors
      // address
      .verify.containsText('.modal-send-coin .tx-address-validation', 'Incorrect address. Please, make sure you enter it right.')
      .verify.cssClassPresent('.modal-send-coin .tx-address-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-address', 'validation-field-error')
      // amount
      .verify.containsText('.modal-send-coin .tx-amount-validation span', 'Please enter an amount.')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-amount', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-currency', 'validation-field-error')
      // fee
      .verify.containsText('.modal-send-coin .tx-fee-validation span', 'Select an option or enter a value for the fee.')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
    browser
      .pause(1000)
      // address
      .clearValue('.modal-send-coin .tx-address')
      .setValue('.modal-send-coin .tx-address', getAddress().trim() + '1234567890')
      .click('.modal-send-coin .btn-next')
      .pause(250)
      .verify.containsText('.modal-send-coin .tx-address-validation', 'Incorrect address. Please, make sure you enter it right.')
      .verify.cssClassPresent('.modal-send-coin .tx-address-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-address', 'validation-field-error')
      // amount
      .clearValue('.modal-send-coin .tx-amount')
      .clearValue('.modal-send-coin .tx-amount-currency')
      .setValue('.modal-send-coin .tx-amount', (Number(getBalance().toFixed(2)) + 100))
      .click('.modal-send-coin .btn-next')
      .pause(250)
      .verify.containsText('.modal-send-coin .tx-amount-validation span', 'Not enough money. Max. ' + getBalance().toFixed(0) + ' ' + coin.toUpperCase())
      .verify.cssClassPresent('.modal-send-coin .tx-amount-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-amount', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-currency', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
      .clearValue('.modal-send-coin .tx-amount')
      .clearValue('.modal-send-coin .tx-amount-currency')
      .setValue('.modal-send-coin .tx-amount-currency', ((Number(getBalance() + 100) * usdCurrencyRate().SYS.USD).toFixed(2)))
      .click('.modal-send-coin .btn-next')
      // fee
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .setValue('.modal-send-coin .tx-fee', 0.00000001)
      .pause(250)
      .verify.containsText('.modal-send-coin .tx-fee-validation span', '0.00001 SYS is a min. required fee.')
      .click('.modal-send-coin .btn-next')
      .pause(500)
      .verify.containsText('.modal-send-coin .tx-fee-validation span', 'Please enter a correct amount')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .setValue('.modal-send-coin .tx-fee', (Number(getBalance().toFixed(2)) + 100))
      .click('.modal-send-coin .btn-next')
      .pause(250)
      .verify.containsText('.modal-send-coin .tx-fee-validation span', 'Please enter a correct amount')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .setValue('.modal-send-coin .tx-fee-currency', ((Number(getBalance() + 100) * usdCurrencyRate().SYS.USD).toFixed(2)))
      .click('.modal-send-coin .btn-next')
      .pause(250)
      .verify.containsText('.modal-send-coin .tx-fee-validation span', 'Select an option or enter a value for the fee.')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
    // amount fields keying test
    browser
      .clearValue('.modal-send-coin .tx-address')
      .clearValue('.modal-send-coin .tx-amount')
      .clearValue('.modal-send-coin .tx-amount-currency')
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .pause(1000)
      .setValue('.modal-send-coin .tx-amount', ['100'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-amount-currency', Number(usdCurrencyRate().SYS.USD * 100).toFixed(4))
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['1000'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-amount-currency', Number(usdCurrencyRate().SYS.USD * 1000).toFixed(2))
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['0'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-amount-currency', '')
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['-100'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-amount-currency', 0)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['abc'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-amount-currency', 0)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['=$#;,'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-amount-currency', 0)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['001'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-amount', 0.1)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['10.01'])
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .pause(250)
      .verify.valueContains('.modal-send-coin .tx-amount', 10.01)
    browser
      .pause(1000)
      .setValue('.modal-send-coin .tx-fee', ['100'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-fee-currency', Number(usdCurrencyRate().SYS.USD * 100).toFixed(2))
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['1000'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-fee-currency', Number(usdCurrencyRate().SYS.USD * 1000).toFixed(2))
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['0'])
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .verify.valueContains('.modal-send-coin .tx-fee-currency', '')
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['-100'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-fee-currency', 0)
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['abc'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-fee-currency', '')
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['=$#;,'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-fee-currency', '')
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['001'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .verify.valueContains('.modal-send-coin .tx-fee', 0.1)
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['10.01'])
      .pause(10, function() {
        responsiveTest('.send-coin-modal-container .modal-content')
      })
      .pause(250)
      .verify.valueContains('.modal-send-coin .tx-fee', 10.01)
  }
};