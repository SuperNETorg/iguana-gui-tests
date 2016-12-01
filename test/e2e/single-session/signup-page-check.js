var conf = require('../../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/',
    step = -1,
    generatedPassphraseText,
    chalk = require('chalk'),
    util = require('util'),
    exec = require('child_process').exec,
    child;

function getScreenshotUrl() {
  step++;
  return 'screenshots/signup-page-check-' + step +'.png';
}

module.exports = {
  'test IguanaGUI Create account page check': function(browser) {
    browser
      .click('.btn-signup')
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
      .getText('.generated-passhprase', function(result) { // TODO: make custom assert
        generatedPassphraseText = result.value
        var generatedPassphraseComponents = result.value.split(' ')
        if (generatedPassphraseComponents.length === 12)
          console.log(chalk.green(' ✔') + ' Passphrase is correct')
        else
          console.log(chalk.red(' ✖') + ' Passphrase is incorrect!')
      })
      .click('label.checkbox-label')
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should be disabled')
        this.verify.equal(result.value, 'true')
      })
      .saveScreenshot(getScreenshotUrl())
  }
};