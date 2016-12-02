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
  return 'screenshots/login-add-wallet-mzc-dashboard-' + step +'.png';
}

module.exports = {
  'test IguanaGUI execute add mzc wallet on dashboard page': function(browser) {
    browser
      .pause(500)
      .verify.cssClassNotPresent('.coins .btn-add-coin', 'disabled')
      .click('.coins .btn-add-coin')
      .waitForElementVisible('.add-coin-login-form')
      .waitForElementVisible('.add-coin-login-form .login-add-coin-selection-title')
      .moveToElement('.login-add-coin-selection-title', 2, 2, function() {
        console.log('this should open add coin modal')
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .saveScreenshot(getScreenshotUrl())
        browser
          .setValue('.quick-search input[type=text]', ['someunknowncoin'])
          .waitForElementNotPresent('.supported-coins-repeater-inner .coin', 500)
          .saveScreenshot(getScreenshotUrl())
          .clearValue('.quick-search input[type=text]')
        browser
          .verify.visible('.supported-coins-repeater-inner .coin.mzc')
          .verify.cssClassPresent('.btn-next', 'disabled')
        browser
          .setValue('.quick-search input[type=text]', ['mazacoin'])
          .pause(500)
          .verify.visible('.supported-coins-repeater-inner .coin.mzc')
          .click('.supported-coins-repeater-inner .coin.mzc')
          .verify.cssClassNotPresent('.btn-next', 'disabled')
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.mzc', 'active')
          .saveScreenshot(getScreenshotUrl())
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .saveScreenshot(getScreenshotUrl())
          .waitForElementPresent('#passphrase')
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
      })
  }
};