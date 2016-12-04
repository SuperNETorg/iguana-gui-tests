var conf = require('../../../nightwatch.conf.js'),
    fs = require('fs'),
    currency = 'usd',
    coin = 'sys',
    coinFullName = 'Syscoin';

var getScreenshotUrl = (function(name) {
    var counter = -1;

    return function () {
      counter += 1;
      return 'screenshots/' + name + '-' + counter + '.png';
    }
})('dashboard-send-coin-sys-fields');

function getAddress() {
  return fs.readFileSync('temp/accountaddress-sys.txt', 'utf-8');
}

function usdCurrencyRate() {
  return JSON.parse(fs.readFileSync('temp/sys-doge-rate.txt', 'utf-8'));
}

function getBalance() {
  return Number(fs.readFileSync('temp/getbalance-sys.txt', 'utf-8'));
}

module.exports = {
  'test IguanaGUI dashboard send coin modal': function(browser) {
    browser
      .click('.transactions-unit .action-buttons .btn-send')
      .waitForElementVisible('.modal-send-coin .form-header .title')
      .verify.containsText('.modal-send-coin .form-header .title', 'Sending')
      .verify.containsText('.modal-send-coin .headd .name', coinFullName)
      .verify.containsText('.modal-send-coin .balance .balance-coin .value', getBalance().toFixed(1))
      .verify.containsText('.modal-send-coin .balance .balance-coin .name', coin.toUpperCase())
      .verify.containsText('.modal-send-coin .balance .balance-currency .value', Number(usdCurrencyRate().SYS.USD * getBalance()).toFixed(2))
      .verify.containsText('.modal-send-coin .balance .balance-currency .name', currency.toUpperCase())
      // submit empty form
      .click('.modal-send-coin .btn-next')
      // check errors
      // address
      .verify.containsText('.modal-send-coin .tx-address-validation', 'Incorrect address. Please, make sure you enter it right.')
      .verify.cssClassPresent('.modal-send-coin .tx-address-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-address', 'validation-field-error')
      // amount
      .verify.containsText('.modal-send-coin .tx-amount-validation span', 'Please enter an amount.')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-amount', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-currency', 'validation-field-error')
      // fee
      .verify.containsText('.modal-send-coin .tx-fee-validation span', '0.00001 SYS is a min. required fee.')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
    browser
      .pause(1000)
      // address
      .setValue('.modal-send-coin .tx-address', getAddress().trim() + '1234567890')
      .click('.modal-send-coin .btn-next')
      .verify.containsText('.modal-send-coin .tx-address-validation', 'Incorrect address. Please, make sure you enter it right.')
      .verify.cssClassPresent('.modal-send-coin .tx-address-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-address', 'validation-field-error')
      // amount
      .setValue('.modal-send-coin .tx-amount', (Number(getBalance().toFixed(2)) + 100))
      .click('.modal-send-coin .btn-next')
      .verify.containsText('.modal-send-coin .tx-amount-validation span', 'Not enough money. Max. ' + getBalance().toFixed(2) + ' ' + coin.toUpperCase())
      .verify.cssClassPresent('.modal-send-coin .tx-amount-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-amount', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-currency', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
      .clearValue('.modal-send-coin .tx-amount')
      .clearValue('.modal-send-coin .tx-amount-currency')
      .setValue('.modal-send-coin .tx-amount-currency', ((Number(getBalance() + 100) * usdCurrencyRate().SYS.USD).toFixed(2)))
      .click('.modal-send-coin .btn-next')
      // fee
      .setValue('.modal-send-coin .tx-fee', (Number(getBalance().toFixed(2)) + 100))
      .click('.modal-send-coin .btn-next')
      .verify.containsText('.modal-send-coin .tx-amount-validation span', 'Not enough money. Max. ' + getBalance().toFixed(2) + ' ' + coin.toUpperCase())
      .verify.cssClassPresent('.modal-send-coin .tx-amount-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-amount', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-currency', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .setValue('.modal-send-coin .tx-fee-currency', ((Number(getBalance() + 100) * usdCurrencyRate().SYS.USD).toFixed(2)))
      .click('.modal-send-coin .btn-next')
      .verify.containsText('.modal-send-coin .tx-amount-validation span', 'Not enough money. Max. ' + getBalance().toFixed(2) + ' ' + coin.toUpperCase())
      .verify.cssClassPresent('.modal-send-coin .tx-amount-validation', 'col-red')
      .verify.cssClassPresent('.modal-send-coin .tx-amount', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-amount-currency', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee', 'validation-field-error')
      .verify.cssClassPresent('.modal-send-coin .tx-fee-currency', 'validation-field-error')
    // amount fields keying test
    browser
      .clearValue('.modal-send-coin .tx-address')
      .clearValue('.modal-send-coin .tx-amount')
      .clearValue('.modal-send-coin .tx-amount-currency')
      .clearValue('.modal-send-coin .tx-fee')
      .clearValue('.modal-send-coin .tx-fee-currency')
      .pause(1000)
      .setValue('.modal-send-coin .tx-amount', ['100'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-amount-currency', Number(usdCurrencyRate().SYS.USD * 100).toFixed(2))
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['1000'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-amount-currency', Number(usdCurrencyRate().SYS.USD * 1000).toFixed(2))
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['0'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-amount-currency', '')
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['-100'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-amount-currency', 0)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['abc'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-amount-currency', 0)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['=$#;,'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-amount-currency', 0)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['001'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-amount', 0.1)
      .clearValue('.modal-send-coin .tx-amount')
      .setValue('.modal-send-coin .tx-amount', ['10.01'])
      .saveScreenshot(getScreenshotUrl())
      .pause(250)
      .verify.valueContains('.modal-send-coin .tx-amount', 10.01)
    browser
      .pause(1000)
      .setValue('.modal-send-coin .tx-fee', ['100'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-fee-currency', Number(usdCurrencyRate().SYS.USD * 100).toFixed(2))
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['1000'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-fee-currency', Number(usdCurrencyRate().SYS.USD * 1000).toFixed(2))
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['0'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-fee-currency', '')
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['-100'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-fee-currency', 0)
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['abc'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-fee-currency', 0)
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['=$#;,'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-fee-currency', 0)
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['001'])
      .pause(250)
      .saveScreenshot(getScreenshotUrl())
      .verify.valueContains('.modal-send-coin .tx-fee', 0.1)
      .clearValue('.modal-send-coin .tx-fee')
      .setValue('.modal-send-coin .tx-fee', ['10.01'])
      .saveScreenshot(getScreenshotUrl())
      .pause(250)
      .verify.valueContains('.modal-send-coin .tx-fee', 10.01)
  }
};