var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs');

module.exports = {
  'test IguanaGUI get coin to currency rate': function(browser) {
    browser
      .url('https://min-api.cryptocompare.com/data/pricemulti?fsyms=SYS,DOGE&tsyms=USD,EUR')
      .waitForElementVisible('body pre')
      .getText('body pre', function(result) {
        fs.writeFileSync('temp/sys-doge-rate.txt', result.value, 'utf-8')
      })
      .pause(1000)
  }
};