var conf = require('../../../nightwatch.conf.js'),
    step = -1;

function getScreenshotUrl() {
  step++;
  return 'screenshots/change-currency-' + step +'.png';
}

module.exports = {
  'test IguanaGUI change currency': function(browser) {
    browser
      .url(conf.iguanaGuiURL + 'index.html#/settings')
      .waitForElementVisible('.currency-content', 5000)
      .verify.title('Iguana / settings')
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