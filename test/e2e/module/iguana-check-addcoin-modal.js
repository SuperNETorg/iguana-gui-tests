var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI trigger add coin modal (iguana)': function(browser) {
    var getScreenshotUrl = (function(name) {
        var counter = -1;

        return function () {
          counter += 1;
          return 'screenshots/' + browser.globals.test_settings.mode + '/' + name + '-' + counter + '-{{ res }}-' + '.png';
        }
    })('iguana-login-add-wallet-modal');

    var responsiveTest = function() {
      for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
        var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ')
        browser
          .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
          .saveScreenshot(getScreenshotUrl().replace('{{ res }}', browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
      }
    }

    browser
      .pause(3000)
      .moveToElement('.login-add-coin-selection-title', 2, 2, function() {
        console.log('this should open add coin modal')
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .pause(10, function() {
            responsiveTest()
          })
          .setValue('.quick-search input[type=text]', ['komodo'])
          .pause(10, function() {
            responsiveTest()
          })
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
          .pause(10, function() {
            responsiveTest()
          })
          .clearValue('.quick-search input[type=text]')
          .verify.visible('.supported-coins-repeater-inner .coin.btm')
          .setValue('.quick-search input[type=text]', ['syscoin'])
          .pause(500)
          .verify.visible('.supported-coins-repeater-inner .coin.sys')
          .click('.supported-coins-repeater-inner .coin.sys')
          .verify.cssClassNotPresent('.btn-next', 'disabled')
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.sys', 'active')
          .pause(10, function() {
            responsiveTest()
          })
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .pause(10, function() {
            responsiveTest()
          })
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