var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('iguana-signin-to-dashboard-2-coins');

module.exports = {
  'test IguanaGUI singin to dashboard w/ 2 coins (iguana)': function(browser) {
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
      .waitForElementVisible('.iguana-modal')
      .verify.cssClassPresent('.iguana-modal', 'msg-green')
      .verify.containsText('.msg-body span', 'SYS, DOGE added')
      .saveScreenshot(getScreenshotUrl())
      .waitForElementVisible('.dashboard')
      .saveScreenshot(getScreenshotUrl())
  }
};