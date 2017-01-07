var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI execute signup sequence to trigger an error': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('signup-passphrase-error');

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

    browser
      .click('.btn-add-account')
      .waitForElementVisible('.terms-conditionals-form')
      .waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-decline')
      .waitForElementVisible('.terms-conditionals-form .btn-terms-conditions-accept')
      .pause(10, function() {
        responsiveTest('window')
      })
      .click('.terms-conditionals-form .btn-terms-conditions-accept')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-red')
      .verify.containsText('.msg-body span', 'Wallet is already encrypted with another passphrase! Try another wallet or login with your passphrase.')
      .pause(10, function() {
        responsiveTest('window')
      })
      .keys(browser.Keys.ESCAPE)
  }
}