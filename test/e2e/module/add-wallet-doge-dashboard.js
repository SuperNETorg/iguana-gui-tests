var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI execute add doge wallet on dashboard page': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('login-add-wallet-doge-dashboard');

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
      .click('.coins .btn-add-coin')
      .waitForElementVisible('.add-coin-login-form')
      .waitForElementVisible('.add-coin-login-form .login-add-coin-selection-title')
      .moveToElement('.login-add-coin-selection-title', 2, 2, function() {
        console.log('this should open add coin modal')
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
          .pause(10, function() {
            responsiveTest()
          })
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .pause(10, function() {
            responsiveTest()
          })
          .waitForElementPresent('#passphrase')
          .clearValue('#passphrase')
          .setValue('#passphrase', ['test test'])
          .pause(250)
          .pause(10, function() {
            responsiveTest()
          })
          .getAttribute('.btn-signin', 'disabled', function(result) {
            console.log('singin button should be enabled')
            this.verify.equal(result.value, null)
          })
          .click('.btn-signin')
          .pause(250)
          .waitForElementVisible('.dashboard', 5000)
          .pause(10, function() {
            responsiveTest()
          })
      })
  }
};