var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI login page check': function(browser) {

    browser
      .url(conf.iguanaGuiURL + 'index.html#/login')
      .waitForElementVisible('body')
      .verify.title('Iguana / Login')
      .waitForElementVisible('.btn-signin')
      .waitForElementVisible('.btn-signup')
      .pause(10, function() {
        conf.responsiveTest('window', 'login-page-check', browser)
      })
      .pause(4000)
  }
};