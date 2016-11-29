var conf = require('../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/';

module.exports = {
  'test IguanaGUI Index page': function(browser) {
    browser
      .url(iguanaGUIFolder + 'index.html#/signup')
      .waitForElementVisible('body')
      .assert.title('Iguana / Login')
    browser
      .saveScreenshot('screenshots/test.png')
  }
};
