var conf = require('../../../nightwatch.conf.js'),
    testName = 'change-currency';

module.exports = {
  'test IguanaGUI change currency': function(browser) {

    browser
      .url(conf.iguanaGuiURL + 'index.html#/settings')
      .waitForElementVisible('.currency-content', 5000)
      .verify.title('Iguana / Settings')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 0)
      })
      .pause(10000)
      .click('.currency-loop .country-li:nth-child(2)') // select EUR
      .pause(250)
      .verify.cssClassPresent('.currency-loop .country-li:nth-child(2)', 'active')
      .verify.containsText('.currency-loop .country-li:nth-child(2)', 'Euro')
      .pause(10, function() {
        conf.responsiveTest('window', testName, browser, 1)
      })
      .url(conf.iguanaGuiURL + 'index.html#/dashboard')
      .waitForElementVisible('.dashboard')
      .verify.title('Iguana / Dashboard')
  }
};