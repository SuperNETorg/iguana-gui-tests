var conf = require('../../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/',
    step = -1,
    chalk = require('chalk'),
    util = require('util'),
    fs = require('fs'),
    generatedPassphraseText,
    exec = require('child_process').exec,
    child;

function getScreenshotUrl() {
  step++;
  return 'screenshots/change-currency-' + step +'.png';
}

module.exports = {
  'test IguanaGUI change currency': function(browser) {
    browser
      .url(iguanaGUIFolder + 'index.html#/settings')
      .waitForElementVisible('.currency-content', 5000)
      .verify.title('Iguana / settings')
      .saveScreenshot(getScreenshotUrl())
      .click('.currency-loop .country-li:nth-child(2)') // select EUR
      .verify.cssClassPresent('.currency-loop .country-li:nth-child(2)', 'active')
      .verify.containsText('.currency-loop .country-li:nth-child(2)', 'Euro')
      .saveScreenshot(getScreenshotUrl())
      .url(iguanaGUIFolder + 'index.html#/dashboard')
      .waitForElementVisible('.dashboard')
      .verify.title('Iguana / Dashboard')
  }
};