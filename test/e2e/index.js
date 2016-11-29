var conf = require('../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/',
    step = -1;

function getScreenshotUrl() {
  step++;
  return 'screenshots/index-login-addcoin-s' + step +'.png';
}

module.exports = {
  'test IguanaGUI Index page': function(browser) {
    browser
      .url(iguanaGUIFolder + 'index.html#/login')
      .waitForElementVisible('body')
      .verify.title('Iguana / Login')
      .saveScreenshot(getScreenshotUrl())
    browser.getAttribute('.btn-signin', 'disabled', function(result) {
      console.log('signin button should be disabled')
      this.verify.equal(result.value, 'true')
    })
    browser.getAttribute('.btn-signup', 'disabled', function(result) {
      console.log('signup button should be enabled')
      this.verify.equal(result.value, null)
    })
    // add coin modal test
    // TODO: run add coin modal 2nd time, test close on X button and on ESC keypress
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
        // login test, TODO: split(?)
        browser
          .clearValue('#passphrase')
          .setValue('#passphrase', ['somerandompassphrase0987654321'])
          .pause(250)
          .saveScreenshot(getScreenshotUrl())
          .getAttribute('.btn-signin', 'disabled', function(result) {
            console.log('singin button should be enabled')
            this.verify.equal(result.value, null)
          })
          .click('.btn-signin')
          .waitForElementVisible('.msg-body', 500)
          .pause(250)
          .verify.containsText('.msg-body span', 'Wrong passphrase!')
          .saveScreenshot(getScreenshotUrl())
          .keys(browser.Keys.ESCAPE)
          .pause(1000)
        browser
          .clearValue('#passphrase')
          .setValue('#passphrase', ['test test'])
          .pause(250)
          .saveScreenshot(getScreenshotUrl())
          .getAttribute('.btn-signin', 'disabled', function(result) {
            console.log('singin button should be enabled')
            this.verify.equal(result.value, null)
          })
          .click('.btn-signin')
          .pause(250)
          .waitForElementVisible('.dashboard', 5000)
          .saveScreenshot(getScreenshotUrl())
      })
  }
};
