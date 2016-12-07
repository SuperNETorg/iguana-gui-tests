var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    generatedPassphraseText;

module.exports = {
  'test IguanaGUI execute signup sequence': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('signup-passphrase');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
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
        responsiveTest()
      })
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be disabled')
        this.verify.equal(result.value, 'true')
      })
      .setValue('#passphrase', 'some random incorrect passphrase')
      .pause(250)
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be disabled')
        this.verify.equal(result.value, 'true')
        generatedPassphraseText = fs.readFileSync('temp/savedpassphrase.txt', 'utf-8')
      })
      .pause(10, function() {
        responsiveTest()
      })
      .setValue('#passphrase', generatedPassphraseText)
      .pause(250)
      .click('#passphrase')
      .pause(250)
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .pause(10, function() {
        responsiveTest()
      })
  }
};