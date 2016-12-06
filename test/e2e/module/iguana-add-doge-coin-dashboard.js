var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('iguana-login-add-wallet-doge-dashboard');

module.exports = {
  'test IguanaGUI execute add doge wallet on dashboard page (iguana)': function(browser) {
    browser
      .pause(500)
      .verify.cssClassNotPresent('.coins .btn-add-coin', 'disabled')
      .moveToElement('.coins .btn-add-coin', 2, 2, function() {
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .saveScreenshot(getScreenshotUrl())
          .setValue('.quick-search input[type=text]', ['someunknowncoin'])
          .waitForElementNotPresent('.supported-coins-repeater-inner .coin', 500)
          .saveScreenshot(getScreenshotUrl())
          .clearValue('.quick-search input[type=text]')
          .verify.visible('.supported-coins-repeater-inner .coin.doge')
          .verify.cssClassPresent('.btn-next', 'disabled')
          .setValue('.quick-search input[type=text]', ['dogecoin'])
          .pause(500)
          .verify.visible('.supported-coins-repeater-inner .coin.doge')
          .click('.supported-coins-repeater-inner .coin.doge')
          .verify.cssClassNotPresent('.btn-next', 'disabled')
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.doge', 'active')
          .saveScreenshot(getScreenshotUrl())
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state')
          .saveScreenshot(getScreenshotUrl())
          .pause(250)
          .waitForElementVisible('.dashboard', 5000)
          .saveScreenshot(getScreenshotUrl())
          .moveToElement('.coins .btn-add-coin', 2, 2, function() {
            browser
              .mouseButtonClick('left')
              .pause(250)
              .waitForElementVisible('.add-new-coin-form-login-state')
              .setValue('.quick-search input[type=text]', ['syscoin'])
              .waitForElementNotPresent('.supported-coins-repeater-inner .coin.sys')
              .saveScreenshot(getScreenshotUrl())
              .clearValue('.quick-search input[type=text]')
              .setValue('.quick-search input[type=text]', ['dogecoin'])
              .waitForElementNotPresent('.supported-coins-repeater-inner .coin.doge')
          })
      })
  }
};