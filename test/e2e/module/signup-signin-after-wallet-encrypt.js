var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('signup-after-wallet-encrypt');

module.exports = {
  'test IguanaGUI execute signin w/ a passphrase created before': function(browser) {
    browser
      .pause(2000)
      .clearValue('#passphrase')
      .setValue('#passphrase', fs.readFileSync('temp/savedpassphrase.txt', 'utf-8'))
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