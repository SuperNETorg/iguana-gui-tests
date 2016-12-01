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
  return 'screenshots/signup-passphrase' + step +'.png';
}

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