var conf = require('../../../nightwatch.conf.js'),
    step = -1;

function getScreenshotUrl() {
  step++;
  return 'screenshots/signin-to-dashboard-' + step + '.png';
}

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