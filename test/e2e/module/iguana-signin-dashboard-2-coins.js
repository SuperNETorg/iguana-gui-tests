var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI singin to dashboard w/ 2 coins (iguana)': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('iguana-signin-to-dashboard-2-coins');

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
      .clearValue('#passphrase')
      .setValue('#passphrase', ['test test'])
      .pause(250)
      .pause(10, function() {
        responsiveTest('window')
      })
      .getAttribute('.btn-signin-account', 'disabled', function(result) {
        console.log('singin button should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-signin-account')
      /*.pause(250)
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-green')
      .verify.containsText('.msg-body span', 'SYS, DOGE added')
      .pause(10, function() {
        responsiveTest('window')
      })*/
      .waitForElementVisible('.dashboard')
      .pause(10, function() {
        responsiveTest('window')
      })
  }
};