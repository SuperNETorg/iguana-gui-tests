var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('signup-passphrase-error');

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