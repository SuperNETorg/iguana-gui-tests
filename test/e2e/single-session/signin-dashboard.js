var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('signin-to-dashboard');

module.exports = {
  'test IguanaGUI singin to dashboard': function(browser) {
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
  }
};