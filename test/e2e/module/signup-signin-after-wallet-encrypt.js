var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs');

module.exports = {
  'test IguanaGUI execute signin w/ a passphrase created before': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('signup-after-wallet-encrypt');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
      }
    }

    browser
      .pause(2000)
      .clearValue('#passphrase')
      .setValue('#passphrase', fs.readFileSync('temp/savedpassphrase.txt', 'utf-8'))
      .pause(250)
      .pause(10, function() {
        responsiveTest()
      })
      .getAttribute('.btn-signin', 'disabled', function(result) {
        console.log('singin button should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-signin')
      .pause(250)
      .waitForElementVisible('.dashboard', 5000)
      .pause(10, function() {
        responsiveTest()
      })
  }
};