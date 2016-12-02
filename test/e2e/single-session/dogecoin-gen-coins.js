var conf = require('../../../nightwatch.conf.js'),
    iguanaGUIFolder = 'file:///home/pbca/Iguana-GUI/compiled/dev/',
    step = -1,
    generatedPassphraseText,
    chalk = require('chalk'),
    util = require('util'),
    fs = require('fs'),
    exec = require('child_process').exec,
    child;

module.exports = {
  'test IguanaGUI execute mazacoin regtest generate': function(browser) {
    browser
      .pause(100, function() {
        console.log('gen doge coins')
        child = exec('./daemon_scripts/bin/dogecoin-cli -regtest generate 101', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
        })
      })
      .pause(1000, function() {
        console.log('get last transaction')
        child = exec('./daemon_scripts/bin/dogecoin-cli -regtest listtransactions "" 1', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
          fs.writeFileSync('listtransactions-doge.txt', stdout, 'utf-8')
        })
      })
      .pause(1000, function() {
        console.log('get account address')
        child = exec('./daemon_scripts/bin/doge-cli -regtest getaccountaddress ""', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
          fs.writeFileSync('accountaddress-doge.txt', stdout, 'utf-8')
        })
      })
      .pause(1000)
      .url(iguanaGUIFolder + 'index.html#/dashboard')
      .pause(2000)
  }
};