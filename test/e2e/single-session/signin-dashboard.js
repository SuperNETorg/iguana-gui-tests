var conf = require('../../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/',
    step = -1,
    chalk = require('chalk'),
    util = require('util'),
    fs = require('fs'),
    generatedPassphraseText,
    exec = require('child_process').exec,
    child;

function getScreenshotUrl() {
  step++;
  return 'screenshots/signin-to-dashboard-' + step +'.png';
}

module.exports = {
  'test IguanaGUI singin to dashboard': function(browser) {
    browser
      .clearValue('#passphrase')
      .setValue('#passphrase', ['test test'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .getAttribute('.btn-signin', 'disabled', function(result) {
        console.log('singin button should be enabled')
        this.verify.equal(result.value, null)
      })
      .click('.btn-signin')
      .pause(250)
      .waitForElementVisible('.dashboard', 5000)
      .saveScreenshot(getScreenshotUrl())
  }
};