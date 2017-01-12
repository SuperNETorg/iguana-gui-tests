var conf = require('../../../nightwatch.conf.js'),
    testName = 'iguana-login-add-wallet-doge-dashboard';

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
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          .setValue('.quick-search input[type=text]', ['someunknowncoin'])
          .waitForElementNotPresent('.supported-coins-repeater-inner .coin', 500)
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
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
          .pause(10, function() {
            conf.responsiveTest('window', testName, browser)
          })
          .pause(250)
          .waitForElementVisible('.dashboard', 5000)
          .pause(10, function() {
            conf.responsiveTest('window', testName, browser)
          })
          // verify that 2 coins are present in the dashboard
          .verify.containsText('.account-coins-repeater .sys .coin-value .val', 0)
          .verify.containsText('.account-coins-repeater .doge .coin-value .val', 0)
          .moveToElement('.coins .btn-add-coin', 2, 2, function() {
            browser
              .mouseButtonClick('left')
              .pause(250)
              .waitForElementVisible('.add-new-coin-form-login-state')
              .setValue('.quick-search input[type=text]', ['syscoin'])
              .waitForElementNotPresent('.supported-coins-repeater-inner .coin.sys')
              .pause(10, function() {
                responsiveTest('.auth-add-coin-modal .modal-content')
              })
              .clearValue('.quick-search input[type=text]')
              .setValue('.quick-search input[type=text]', ['dogecoin'])
              .waitForElementNotPresent('.supported-coins-repeater-inner .coin.doge')
          })
      })
  }
};