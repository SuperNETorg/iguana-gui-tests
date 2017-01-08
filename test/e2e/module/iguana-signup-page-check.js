var conf = require('../../../nightwatch.conf.js'),
    generatedPassphraseText,
    chalk = require('chalk'),
    fs = require('fs');

module.exports = {
  'test IguanaGUI create account page check (iguana)': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('iguana-signup-page-check');

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
      .waitForElementVisible('.create-account-form')
      .verify.title('Iguana / Create account')
      .verify.cssClassPresent('#passphrase-saved-checkbox', 'ng-empty')
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should be disabled')
        this.verify.equal(result.value, 'true')
      })
      .waitForText('.generated-passhprase', function(result) {
        if (result.length > 1)
          return true;
        else
          return false;
      }, 2000)
      .verify.containsText('.passphrase-word-count', '24')
      .getText('.generated-passhprase', function(result) { // TODO: make custom assert
        generatedPassphraseText = result.value
        var generatedPassphraseComponents = result.value.split(' ')
        if (generatedPassphraseComponents.length === 24)
          console.log(chalk.green(' ✔') + ' Passphrase is correct')
        else
          console.log(chalk.red(' ✖') + ' Passphrase is incorrect!')
        fs.writeFileSync('temp/savedpassphrase.txt', generatedPassphraseText, 'utf-8')
      })
      .click('label.checkbox-label')
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should not be disabled')
        this.verify.equal(result.value, null)
      })
      .pause(10, function() {
        responsiveTest('window')
      })
  }
};