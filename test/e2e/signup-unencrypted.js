var conf = require('../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/',
    step = -1,
    generatedPassphraseText,
    chalk = require('chalk'),
    util = require('util'),
    exec = require('child_process').exec,
    child;

function getScreenshotUrl() {
  step++;
  return 'screenshots/index-login-create-account-s' + step +'.png';
}

module.exports = {
  'test IguanaGUI Create account page w/ unencrypted wallet (coind)': function(browser) {
    browser
      .url(iguanaGUIFolder + 'index.html#/login')
      .waitForElementVisible('body')
      .verify.title('Iguana / Login')
      .saveScreenshot(getScreenshotUrl())
    browser.getAttribute('.btn-signin', 'disabled', function(result) {
      console.log('signin button should be disabled')
      this.verify.equal(result.value, 'true')
    })
    browser.getAttribute('.btn-signup', 'disabled', function(result) {
      console.log('signup button should be enabled')
      this.verify.equal(result.value, null)
    })
    browser
      .click('.btn-signup')
      .waitForElementVisible('.create-account-form')
      .verify.title('Iguana / Create account')
      .verify.cssClassPresent('#passphrase-saved-checkbox', 'ng-empty')
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should be disabled')
        this.verify.equal(result.value, 'true')
      })
      .waitForText('.generated-passhprase', function(result) {
        if (result.length > 1)
          return true;
        else
          return false;
      }, 2000)
      .getText('.generated-passhprase', function(result) { // TODO: make custom assert
        generatedPassphraseText = result.value
        var generatedPassphraseComponents = result.value.split(' ')
        if (generatedPassphraseComponents.length === 12)
          console.log(chalk.green(' ✔') + ' Passphrase is correct')
        else
          console.log(chalk.red(' ✖') + ' Passphrase is incorrect!')
      })
      .click('label.checkbox-label')
      .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
        console.log('button next should be disabled')
        this.verify.equal(result.value, 'true')
      })
      .saveScreenshot(getScreenshotUrl())
      // choose a coin via add coin modal
      .moveToElement('.login-add-coin-selection-title', 2, 2, function() {
        console.log('this should open add coin modal')
        browser
          .mouseButtonClick('left')
          .pause(250)
          .waitForElementVisible('.add-new-coin-form-login-state')
          .saveScreenshot(getScreenshotUrl())
        browser
          .verify.visible('.supported-coins-repeater-inner .coin.sys')
          .verify.cssClassPresent('.btn-next', 'disabled')
        browser
          .setValue('.quick-search input[type=text]', ['syscoin'])
          .pause(500)
          .verify.visible('.supported-coins-repeater-inner .coin.sys')
          .click('.supported-coins-repeater-inner .coin.sys')
          .verify.cssClassNotPresent('.btn-next', 'disabled')
          .verify.cssClassPresent('.supported-coins-repeater-inner .coin.sys', 'active')
          .saveScreenshot(getScreenshotUrl())
          .click('.btn-next')
          .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
          .saveScreenshot(getScreenshotUrl())
          .keys(browser.Keys.ESCAPE)
          .pause(1000)
        browser
          .getAttribute('.btn-verify-passphrase', 'disabled', function(result) {
            console.log('button next should be enabled')
            this.verify.equal(result.value, null)
          })
          .click('.btn-verify-passphrase')
          .waitForElementVisible('.verify-passphrase-form')
          .saveScreenshot(getScreenshotUrl())
          .getAttribute('.btn-add-account', 'disabled', function(result) {
            console.log('button add account should be disabled')
            this.verify.equal(result.value, 'true')
          })
          .setValue('#passphrase', 'some random incorrect passphrase')
          .pause(250)
          .getAttribute('.btn-add-account', 'disabled', function(result) {
            console.log('button add account should be disabled')
            this.verify.equal(result.value, 'true')
          })
          .saveScreenshot(getScreenshotUrl())
          .setValue('#passphrase', generatedPassphraseText)
          .pause(250)
          .click('#passphrase')
          .pause(250)
          .getAttribute('.btn-add-account', 'disabled', function(result) {
            console.log('button add account should be enabled')
            this.verify.equal(result.value, null)
          })
          .saveScreenshot(getScreenshotUrl())
          .click('.btn-add-account')
          .waitForElementVisible('.iguana-modal')
          .verify.cssClassPresent('.iguana-modal', 'msg-green')
          .verify.containsText('.msg-body span', 'sys wallet is created. Login to access it.')
          .saveScreenshot(getScreenshotUrl())
          .keys(browser.Keys.ESCAPE)
          .pause(100, function() {
            console.log('restart syscoind')
            child = exec("./daemon_scripts/bin/syscoind -regtest -daemon", function (error, stdout, stderr) {
              util.print('stdout: ' + stdout)
              util.print('stderr: ' + stderr)
              if (error !== null) {
                console.log('exec error: ' + error)
              }
            })
          })
          .pause(3000)
          .waitForElementVisible('.login-form')
          .verify.title('Iguana / Login')
          .saveScreenshot(getScreenshotUrl())
          // login to encrypted wallet
          // choose a coin via add coin modal
          .moveToElement('.login-add-coin-selection-title', 2, 2, function() {
            console.log('this should open add coin modal')
            browser
              .mouseButtonClick('left')
              .pause(250)
              .waitForElementVisible('.add-new-coin-form-login-state')
              .saveScreenshot(getScreenshotUrl())
            browser
              .verify.visible('.supported-coins-repeater-inner .coin.sys')
              .verify.cssClassPresent('.btn-next', 'disabled')
            browser
              .setValue('.quick-search input[type=text]', ['syscoin'])
              .pause(500)
              .verify.visible('.supported-coins-repeater-inner .coin.sys')
              .click('.supported-coins-repeater-inner .coin.sys')
              .verify.cssClassNotPresent('.btn-next', 'disabled')
              .verify.cssClassPresent('.supported-coins-repeater-inner .coin.sys', 'active')
              .saveScreenshot(getScreenshotUrl())
              .click('.btn-next')
              .waitForElementNotPresent('.add-new-coin-form-login-state', 500)
              .saveScreenshot(getScreenshotUrl())
              .keys(browser.Keys.ESCAPE)
              .pause(1000)
            browser
              .clearValue('#passphrase')
              .setValue('#passphrase', generatedPassphraseText)
              .pause(250)
              .saveScreenshot(getScreenshotUrl())
              .getAttribute('.btn-signin', 'disabled', function(result) {
                console.log('singin button should be enabled')
                this.verify.equal(result.value, null)
              })
              .click('.btn-signin')
              .pause(250)
              .waitForElementVisible('.dashboard', 5000)
              .saveScreenshot(getScreenshotUrl())
          })
      })
  }
};
