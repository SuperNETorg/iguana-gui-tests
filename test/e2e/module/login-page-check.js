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

    var responsiveTest = function(containerToScroll) {
      console.log(browser.globals.test_settings.scrollByPoinsCount)
      for (var a=0; a < browser.globals.test_settings.scrollByPoinsCount; a++) {
        for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
          var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
          browser
            .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
            .execute(function(container, run) {
              if (container) {
                var elem = document.querySelector(container);
                if (run === 0) {
                  elem.scrollTop = 0;
                } else {
                    elem.scrollTop = Math.floor(document.querySelector(container).offsetHeight / run);
                }
              }
            }, [containerToScroll, a])
            .saveScreenshot(getScreenshotUrl().replace('{{ res }}', '-scroll-' + a + '-' + browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
        }
      }
    }

    browser
      .url(conf.iguanaGuiURL + 'index.html#/login')
      .waitForElementVisible('body')
      .verify.title('Iguana / Login')
      .waitForElementVisible('.btn-signin')
      .waitForElementVisible('.btn-signup')
      .pause(10, function() {
        responsiveTest('html')
      })
  }
};