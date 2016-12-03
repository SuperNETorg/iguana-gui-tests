var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('login-check');

module.exports = {
  'test IguanaGUI login page check': function(browser) {
    browser
      .url(conf.iguanaGuiURL + 'index.html#/login')
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
    .saveScreenshot(getScreenshotUrl())
  }
};