var conf = require('../../../nightwatch.conf.js'),
    testName = 'iguana-login-add-2-coins';

module.exports = {
  'test IguanaGUI add 2 coins on login (iguana)': function(browser) {

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
          .setValue('.quick-search input[type=text]', ['syscoin'])
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          //.verify.cssClassPresent('.btn-next', 'disabled')
          .click('.supported-coins-repeater-inner .coin.sys')
          .pause(250)
          /*.verify.cssClassPresent('.supported-coins-repeater-inner .coin.sys', 'active')
          .clearValue('.quick-search input[type=text]')
          .setValue('.quick-search input[type=text]', ['dogecoin'])
          .verify.visible('.supported-coins-repeater-inner .coin.doge')
          .pause(250)
          .click('.supported-coins-repeater-inner .coin.doge')
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.doge', 'active')
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          .click('.btn-next')*/
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser)
          })
          /*.pause(500)
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(1) div:first-child', 'Syscoin')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(1) div:last-child', 'SYS')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(2) div:first-child', 'Dogecoin')
          .verify.containsText('.login-add-coin-selection .ng-scope:nth-child(2) div:last-child', 'DOGE')*/
      })
  }
};