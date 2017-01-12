var conf = require('../../../nightwatch.conf.js'),
    generatedPassphraseText,
    chalk = require('chalk'),
    fs = require('fs'),
    testName = 'signup-page-check';

module.exports = {
  'test IguanaGUI create account page check': function(browser) {

    browser
      .pause(2000)
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
      .verify.containsText('.passphrase-word-count', '12')
      .getText('.generated-passhprase', function(result) { // TODO: make custom assert
        generatedPassphraseText = result.value
        var generatedPassphraseComponents = result.value.split(' ')
        if (generatedPassphraseComponents.length === 12)
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
        conf.responsiveTest('window', testName, browser)
      })
  }
};