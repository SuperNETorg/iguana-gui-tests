/*
 *  Iguana GUI testing suite
 *  ref: https://github.com/dwyl/learn-nightwatch
 *       http://nightwatchjs.org
 *       https://www.digitalocean.com/community/tutorials/how-to-install-java-on-ubuntu-with-apt-get
 */

require('env2')('.env'); // optionally store youre Evironment Variables in .env

const PKG = require('./package.json'); // so we can get the version of the project
const BINPATH = './node_modules/nightwatch/bin/'; // change if required.
const SCREENSHOT_PATH = './node_modules/nightwatch/screenshots/' + PKG.version + '/'

/*
 *  extend tests
 *  provides an ability to reuse tests as modules
 */
var extend = function(target) {
  var sources = [].slice.call(arguments, 1);

  sources.forEach(function(source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });

  return target;
};

const config = { // we use a nightwatch.conf.js file so we can include comments and helper functions
  'custom_commands_path' : 'node_modules/nightwatch-custom-commands-assertions/js/commands',
  'custom_assertions_path' : 'node_modules/nightwatch-custom-commands-assertions/js/assertions',
  'iguanaGuiURL': 'file:///home/pbca/Iguana-GUI/compiled/dev/',
  'daemonBinaryPath': './daemon_scripts/bin/',
  'src_folders': [
    'test/e2e'     // we use /test as the name of our test directory by default. so test/e2e for e2e
  ],
  'output_folder': './node_modules/nightwatch/reports', // reports (test outcome) output by nightwatch
  'selenium': {
    'start_process': true,
    'server_path': BINPATH + 'selenium.jar', // downloaded by selenium-download module (see below)
    'log_path': '',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver' : BINPATH + 'chromedriver'
    }
  },
  'test_workers' : {
    'enabled' : true,
    'workers' : 'auto'
  }, // perform tests in parallel where possible
  'test_settings': {
    'local': {
      'launch_url': 'http://localhost',
      'selenium_port': 4444,
      'selenium_host': '127.0.0.1',
      'silent': true,
      'screenshots': {
        'enabled': true, // save screenshots taken here
        'path': SCREENSHOT_PATH
      }, // this allows us to control the
      'globals': {
        'waitForConditionTimeout': 15000 // on localhost sometimes internet is slow so wait...
      },
      'desiredCapabilities': {
        'browserName': 'chrome',
        'chromeOptions': {
          'args': [
            `Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
            (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
            //'--window-size=1900,1000'
            '--window-size=1280,800'
          ]
        },
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },
    'chrome': { // local chrome
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  },
  extend: extend
}

module.exports = config;

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error); // no point continuing so exit!

      console.log('✔ Selenium & Chromedriver downloaded to: ', BINPATH);
    });
  }
});

var FILECOUNT = 0; // 'global' screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  var a = browser.options.desiredCapabilities,
      meta = [a.platform];

  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.

  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
