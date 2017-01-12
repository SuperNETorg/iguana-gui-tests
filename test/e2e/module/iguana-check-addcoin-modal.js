var conf = require('../../../nightwatch.conf.js'),
    testName = 'iguana-login-add-wallet-modal';

module.exports = {
  'test IguanaGUI trigger add coin modal (iguana)': function(browser) {

    browser
      .pause(3000)
      .moveToElement('.btn.row.btn-signin', 2, 2, function() {
        console.log('this should open add coin modal')
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          .setValue('.quick-search input[type=text]', ['komodo'])
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
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
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
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
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
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