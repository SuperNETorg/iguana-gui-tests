var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs');

module.exports = {
  'test IguanaGUI execute signup sequence': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('signup-passphrase');

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
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-verify-passphrase')
      .waitForElementVisible('.verify-passphrase-form')
      .pause(10, function() {
        responsiveTest('window')
      })
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .clearValue('#passphrase')
      .setValue('#passphrase', 'some random incorrect passphrase')
      .pause(250)
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .pause(10, function() {
        responsiveTest('window')
      })
      .clearValue('#passphrase')
      .setValue('#passphrase', fs.readFileSync('temp/savedpassphrase.txt', 'utf-8'))
      .pause(250)
      .click('#passphrase')
      .pause(250)
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .pause(10, function() {
        responsiveTest('window')
      })
  }
};