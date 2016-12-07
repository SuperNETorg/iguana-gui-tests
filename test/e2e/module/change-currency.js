var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI change currency': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('change-currency');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
      }
    }

    browser
      .url(conf.iguanaGuiURL + 'index.html#/settings')
      .waitForElementVisible('.currency-content', 5000)
      .verify.title('Iguana / Settings')
      .pause(10, function() {
        responsiveTest()
      })
      .click('.currency-loop .country-li:nth-child(2)') // select EUR
      .verify.cssClassPresent('.currency-loop .country-li:nth-child(2)', 'active')
      .verify.containsText('.currency-loop .country-li:nth-child(2)', 'Euro')
      .pause(10, function() {
        responsiveTest()
      })
      .url(conf.iguanaGuiURL + 'index.html#/dashboard')
      .waitForElementVisible('.dashboard')
      .verify.title('Iguana / Dashboard')
  }
};