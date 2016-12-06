var conf = require('../../../nightwatch.conf.js'),
    exec = require('child_process').exec;

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('iguana-signup-passphrase-success');

module.exports = {
  'test IguanaGUI click add account on passphrase verification step ()': function(browser) {
    browser
      .click('.btn-add-account')
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-green')
      .verify.containsText('.msg-body span', 'sys wallet is created. Login to access it.')
      .saveScreenshot(getScreenshotUrl())
      .keys(browser.Keys.ESCAPE)
  }
}