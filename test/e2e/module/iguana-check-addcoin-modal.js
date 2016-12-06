var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('iguana-login-add-wallet-modal');

module.exports = {
  'test IguanaGUI trigger add coin modal (iguana)': function(browser) {
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
          .setValue('.quick-search input[type=text]', ['komodo'])
          .saveScreenshot(getScreenshotUrl())
          .verify.cssClassPresent('.btn-next', 'disabled')
          .click('.supported-coins-repeater-inner .coin.kmd')
          .pause(250)
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.kmd', 'active')
          .clearValue('.quick-search input[type=text]')
          .setValue('.quick-search input[type=text]', ['bitmark'])
          .verify.visible('.supported-coins-repeater-inner .coin.btm')
          .pause(250)
          .click('.supported-coins-repeater-inner .coin.btm')
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.btm', 'active')
          .saveScreenshot(getScreenshotUrl())
          .clearValue('.quick-search input[type=text]')
          .verify.visible('.supported-coins-repeater-inner .coin.btm')
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
          .pause(500)
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(1) div:first-child', 'Komodo')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(1) div:last-child', 'KMD')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(2) div:first-child', 'Bitmark')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(2) div:last-child', 'BTM')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(3) div:first-child', 'Syscoin')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(3) div:last-child', 'SYS')
      })
  }
};