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
  return 'screenshots/login-add-wallet-sys-2nd-time' + step +'.png';
}

module.exports = {
  'test IguanaGUI execute add a wallet 2nd time': function(browser) {
    browser
      .pause(3000)
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
          .verify.visible('.supported-coins-repeater-inner .coin.sys')
          .verify.cssClassPresent('.btn-next', 'disabled')
        browser
          .setValue('.quick-search input[type=text]', ['syscoin'])
          .pause(500)
          .verify.visible('.supported-coins-repeater-inner .coin.sys')
          .click('.supported-coins-repeater-inner .coin.sys')
          .verify.cssClassNotPresent('.btn-next', 'disabled')
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.sys', 'active')
          .saveScreenshot(getScreenshotUrl())
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .saveScreenshot(getScreenshotUrl())
      })
  }
};