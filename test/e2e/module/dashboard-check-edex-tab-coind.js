var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI dashboard edex tab check (coind)': function(browser) {

    browser
      .waitForElementNotPresent('.navbar-edex')
  }
};