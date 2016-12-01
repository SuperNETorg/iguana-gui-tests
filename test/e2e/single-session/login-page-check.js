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
  return 'screenshots/login-check-' + step +'.png';
}

module.exports = {
  'test IguanaGUI Index page check': function(browser) {
    browser
      .url(iguanaGUIFolder + 'index.html#/login')
      .waitForElementVisible('body')
      .verify.title('Iguana / Login')
      .saveScreenshot(getScreenshotUrl())
    browser.getAttribute('.btn-signin', 'disabled', function(result) {
      console.log('signin button should be disabled')
      this.verify.equal(result.value, 'true')
    })
    browser.getAttribute('.btn-signup', 'disabled', function(result) {
      console.log('signup button should be enabled')
      this.verify.equal(result.value, null)
    })
  }
};