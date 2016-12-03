var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    generatedPassphraseText;

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('signup-passphrase');

module.exports = {
  'test IguanaGUI execute signup sequence': function(browser) {
    browser
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-verify-passphrase')
      .waitForElementVisible('.verify-passphrase-form')
      .saveScreenshot(getScreenshotUrl())
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
      .saveScreenshot(getScreenshotUrl())
      .setValue('#passphrase', generatedPassphraseText)
      .pause(250)
      .click('#passphrase')
      .pause(250)
      .getAttribute('.btn-add-account', 'disabled', function(result) {
        console.log('button add account should be enabled')
        this.verify.equal(result.value, null)
      })
      .saveScreenshot(getScreenshotUrl())
  }
};