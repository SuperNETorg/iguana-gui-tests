var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI execute add doge wallet on dashboard page (iguana)': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('iguana-login-add-wallet-doge-dashboard');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
      }
    }

    browser
      .pause(500)
      .verify.cssClassNotPresent('.coins .btn-add-coin', 'disabled')
      .moveToElement('.coins .btn-add-coin', 2, 2, function() {
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .pause(10, function() {
            responsiveTest()
          })
          .setValue('.quick-search input[type=text]', ['someunknowncoin'])
          .waitForElementNotPresent('.supported-coins-repeater-inner .coin', 500)
          .pause(10, function() {
            responsiveTest()
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
            responsiveTest()
          })
          .pause(250)
          .waitForElementVisible('.dashboard', 5000)
          .pause(10, function() {
            responsiveTest()
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
                responsiveTest()
              })
              .clearValue('.quick-search input[type=text]')
              .setValue('.quick-search input[type=text]', ['dogecoin'])
              .waitForElementNotPresent('.supported-coins-repeater-inner .coin.doge')
          })
      })
  }
};