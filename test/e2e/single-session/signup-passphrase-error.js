var conf = require('../../../nightwatch.conf.js'),
    step = -1;

function getScreenshotUrl() {
  step++;
  return 'screenshots/signup-passphrase-error' + step +'.png';
}

module.exports = {
  'test IguanaGUI execute signup sequence to trigger an error': function(browser) {
    browser
      .click('.btn-add-account')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-red')
      .verify.containsText('.msg-body span', 'Wallet is already encrypted with another passphrase! Try another wallet or login with your passphrase.')
      .saveScreenshot(getScreenshotUrl())
      .keys(browser.Keys.ESCAPE)
  }
}