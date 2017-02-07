var conf = require('../../../nightwatch.conf.js'),
    testName = 'login-add-wallet-sys-iguana';

module.exports = {
  'test IguanaGUI execute add a wallet (iguana)': function(browser) {

    browser
      .pause(3000)
      .moveToElement('.btn.row.btn-signin', 2, 2, function() {
        console.log('this should open add coin modal')
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .pause(1000)
          .pause(10, function() {
            conf.responsiveTest('.auth-add-coin-modal .modal-content', testName, browser, 0)
          })
          .setValue('.quick-search input[type=text]', ['someunknowncoin'])
          .waitForElementNotPresent('.supported-coins-repeater-inner .coin', 500)
          .clearValue('.quick-search input[type=text]')
          .verify.visible('.supported-coins-repeater-inner .coin.sys')
          .getAttribute('.btn-signin-account', 'disabled', function(result) {
            console.log('button next should be disabled')
            this.verify.equal(result.value, 'true')
          })
          .setValue('.quick-search input[type=text]', ['syscoin'])
          .pause(500)
          .getAttribute('.btn-signin-account', 'disabled', function(result) {
            console.log('button next should be disabled')
            this.verify.equal(result.value, 'true')
          })
          .verify.visible('.supported-coins-repeater-inner .coin.sys')
          .click('.supported-coins-repeater-inner .coin.sys')
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .pause(10, function() {
            conf.responsiveTest('window', testName, browser, 0, true)
          })
      })
  }
};