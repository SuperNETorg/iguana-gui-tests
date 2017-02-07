var conf = require('../../../nightwatch.conf.js');

module.exports = {
  'test IguanaGUI dashboard edex tab check (iguana)': function(browser) {

    browser
      .waitForElementVisible('.navbar-edex')
      .click('.navbar-edex')
      .pause(250)
      .verify.urlEquals(conf.iguanaGuiURL + 'EasyDEX-GUI/index.html')
      .execute(function () {
        window.history.back()
      })
      .pause(250)
      .verify.urlEquals(conf.iguanaGuiURL + 'index.html#/dashboard')
      .waitForElementVisible('.navbar-edex')
  }
};