var conf = require('../../../nightwatch.conf.js');

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('change-currency');

module.exports = {
  'test IguanaGUI change currency': function(browser) {
    browser
      .url(conf.iguanaGuiURL + 'index.html#/settings')
      .waitForElementVisible('.currency-content', 5000)
      .verify.title('Iguana / Settings')
      .saveScreenshot(getScreenshotUrl())
      .click('.currency-loop .country-li:nth-child(2)') // select EUR
      .verify.cssClassPresent('.currency-loop .country-li:nth-child(2)', 'active')
      .verify.containsText('.currency-loop .country-li:nth-child(2)', 'Euro')
      .saveScreenshot(getScreenshotUrl())
      .url(conf.iguanaGuiURL + 'index.html#/dashboard')
      .waitForElementVisible('.dashboard')
      .verify.title('Iguana / Dashboard')
  }
};