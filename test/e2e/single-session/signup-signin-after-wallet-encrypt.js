var conf = require('../../../nightwatch.conf.js'),
    step = -1;

function getScreenshotUrl() {
  step++;
  return 'screenshots/signup-after-wallet-encrypt-' + step +'.png';
}

module.exports = {
  'test IguanaGUI execute signin w/ a passphrase created before': function(browser) {
    browser
      .pause(2000)
      .clearValue('#passphrase')
      .setValue('#passphrase', fs.readFileSync('savedpassphrase.txt', 'utf-8'))
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