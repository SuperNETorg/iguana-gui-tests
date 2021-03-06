var conf = require('../../../nightwatch.conf.js'),
    step = -1,
    fs = require('fs'),
    exec = require('child_process').exec;

module.exports = {
  'test IguanaGUI execute dogecoin regtest generate': function(browser) {
    browser
      .pause(100, function() {
        console.log('gen doge coins')
        child = exec(conf.daemonBinaryPath + 'dogecoin-cli -regtest generate 101', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
        })
      })
      .pause(1000, function() {
        console.log('get last transaction')
        exec(conf.daemonBinaryPath + 'dogecoin-cli -regtest listtransactions "" 1', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
          fs.writeFileSync('temp/listtransactions-doge.txt', stdout, 'utf-8')
        })
      })
      .pause(1000, function() {
        console.log('get account address')
        exec(conf.daemonBinaryPath + 'dogecoin-cli -regtest getaccountaddress ""', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
          fs.writeFileSync('temp/accountaddress-doge.txt', stdout, 'utf-8')
        })
      })
      .pause(1000, function() {
        console.log('get account balance')
        exec(conf.daemonBinaryPath + 'dogecoin-cli -regtest getbalance ""', function(error, stdout, stderr) {
          console.log('stdout: ' + stdout)
          console.log('stderr: ' + stderr)
          if (error !== null) {
            console.log('exec error: ' + error)
          }
          fs.writeFileSync('temp/getbalance-doge.txt', stdout, 'utf-8')
        })
      })
      .pause(1000)
      .url(conf.iguanaGuiURL + 'index.html#/dashboard')
      .pause(2000)
  }
};