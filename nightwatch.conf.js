/*
 *  Iguana GUI testing suite
 *  ref: https://github.com/dwyl/learn-nightwatch
 *       http://nightwatchjs.org
 *       https://www.digitalocean.com/community/tutorials/how-to-install-java-on-ubuntu-with-apt-get
 */

require('env2')('.env'); // optionally store youre Evironment Variables in .env

const PKG = require('./package.json'), // so we can get the version of the project
      BINPATH = './node_modules/nightwatch/bin/', // change if required.
      SCREENSHOT_PATH = 'screenshots';

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

var responsiveTest = function(containerToScroll, name, browser) {
  var getScreenshotUrl = function() {
    return SCREENSHOT_PATH + '/' + browser.globals.test_settings.mode + '/' + name + '-' + Date.now() + '-{{ res }}-' + '.png';
  };

  for (var a=0; a < browser.globals.test_settings.scrollByPoinsCount; a++) {
    for (var i=0; i < browser.globals.test_settings.responsiveBreakPoints.length; i++) {
      var viewport = browser.globals.test_settings.responsiveBreakPoints[i].split(' x ');

      browser
        .resizeWindow(Number(viewport[0]) + 10, Number(viewport[1]) + 80)
        .execute(function(container, run) {
          if (container) {
            var elem = document.querySelector(container);

            if (run === 0) {
              if (container === 'window')
                window.scrollBy(0, document.querySelector('html').offsetHeight * -1);
              else
                elem.scrollTop = 0;
            } else {
              if (container === 'window')
                window.scrollBy(0, document.querySelector('html').offsetHeight / run);
              else
                elem.scrollTop = Math.floor(document.querySelector(container).offsetHeight / run);
            }
          }
        }, [containerToScroll, a])
        .saveScreenshot(getScreenshotUrl().replace('{{ res }}', 'scroll-' + a + '-' + browser.globals.test_settings.responsiveBreakPoints[i].replace(' x ', 'x')))
    }
  }
}

const config = { // we use a nightwatch.conf.js file so we can include comments and helper functions
  'custom_commands_path' : 'node_modules/nightwatch-custom-commands-assertions/js/commands',
  'custom_assertions_path' : 'node_modules/nightwatch-custom-commands-assertions/js/assertions',
  'iguanaGuiURL': 'file:///home/pbca/gui02/compiled/dev/',
  'daemonBinaryPath': './daemon_scripts/bin/',
  'src_folders': [
    'test/e2e' // we use /test as the name of our test directory by default. so test/e2e for e2e
  ],
  'output_folder': 'reports', // reports (test outcome) output by nightwatch
  'selenium': {
    'start_process': true,
    'server_path': BINPATH + 'selenium.jar', // downloaded by selenium-download module (see below)
    'log_path': '',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': BINPATH + 'chromedriver',
      'webdriver.gecko.driver': BINPATH + 'geckodriver' // v0.9, ff 48 and above
    }
  },
  'test_workers' : {
    'enabled' : true,
    'workers' : 'auto'
  }, // perform tests in parallel where possible
  'test_settings': {
    'coind_responsive': {
      'mode': 'coind',
      'scrollByPoinsCount': 3,
      'responsiveBreakPoints': [ // more viewports here http://viewportsizes.com/
        //'320 x 240',
        //'320 x 568',
        '360 x 480',
        '400 x 800',
        '480 x 320',
        '540 x 960',
        '568 x 480',
        '600 x 800',
        '640 x 480',
        '768 x 1024',
        '800 x 600',
        '960 x 1280',
        '1024 x 768',
        '1136 x 640',
        '1280 x 768',
        '1360 x 768',
        '1440 x 900',
        '1600 x 900',
        '1680 x 1050',
        '1920 x 1080'
      ],
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
            '--window-size=1280,800'
          ]
        },
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },
    'iguana_responsive': {
      'mode': 'iguana',
      'scrollByPoinsCount': 3,
      'responsiveBreakPoints': [ // more viewports here http://viewportsizes.com/
        //'320 x 240',
        //'320 x 568',
        '360 x 480',
        '400 x 800',
        '480 x 320',
        '540 x 960',
        '568 x 480',
        '600 x 800',
        '640 x 480',
        '768 x 1024',
        '800 x 600',
        '960 x 1280',
        '1024 x 768',
        '1136 x 640',
        '1280 x 768',
        '1360 x 768',
        '1440 x 900',
        '1600 x 900',
        '1680 x 1050',
        '1920 x 1080'
      ],
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
            '--window-size=1280,800'
          ]
        },
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },
    'coind': {
      'mode': 'coind',
      'scrollByPoinsCount': 3,
      'responsiveBreakPoints': [
        '1280 x 800' // screenshots are saved at this resolution
      ],
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
            '--window-size=1280,800'
          ]
        },
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },
    'iguana': {
      'mode': 'iguana',
      'scrollByPoinsCount': 3,
      'responsiveBreakPoints': [
        '1280 x 800' // screenshots are saved at this resolution
      ],
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
    },
    'firefox': { // local firefox
      'desiredCapabilities': {
        'browserName': 'firefox',
        'marionette': true,
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  },
  extend: extend,
  responsiveTest: responsiveTest
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