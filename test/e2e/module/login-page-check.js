var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI login page check': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function() {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('login-check');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
      }
    }

    browser
      .url(conf.iguanaGuiURL + 'index.html#/login')
      .waitForElementVisible('body')
      .verify.title('Iguana / Login')
      .pause(10, function() {
        responsiveTest()
      })
      .pause(10, function() {
        responsiveTest()
      })
      .getAttribute('.btn-signin', 'disabled', function(result) {
        console.log('signin button should be disabled')
        this.verify.equal(result.value, 'true')
      })
      .getAttribute('.btn-signup', 'disabled', function(result) {
        console.log('signup button should be enabled')
        this.verify.equal(result.value, null)
      })
  }
};