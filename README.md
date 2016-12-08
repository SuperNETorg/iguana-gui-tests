# Iguana GUI Testing Suite
```
sudo apt-get update
sudo apt-get install openjdk-7-jdk
npm install
npm install will download Selenium v2.53
```

Other deps:
- Built Iguana GUI
- Iguana Core binary
- Built Syscoin binaries https://github.com/syscoin/syscoin2
- Built Dogecoin binaries https://github.com/dogecoin/dogecoin

Place syscoind, syscoin-cli, dogecoin-cli, dogecoind in **daemon_scripts/bin** folder.

Place iguana into **daemon_scripts/bin/iguancore** folder.

Allow .sh scripts in daemon_scripts dir to execute as binaries.

Coind are running in regtest mode to eliminate latency issues.

https://bitcoin.org/en/developer-examples#regtest-mode

# !Backup your wallet.dat before running any commands in regtest mode! #


Test coverage so far:

## Coind ##
- Open index and add choose SYS wallet (**npm run coind-add-wallet**)
- Encrypt SYS wallet (**npm run coind-signup-success**)
- Encrypt already encrypted SYS wallet (**npm run coind-signup-error**)
- Encrypt unencrypted SYS wallet and signin into dashboard (**npm run coind-signup-w-signin**)
- Signin with test SYS wallet and change currency (**npm run coind-signin-change-currency**)
- Signin with test SYS wallet and check empty dashboard (**npm run coind-dashboard-empty-wallet**)
- Signin with test SYS wallet and check non-empty dashboard (**npm run coind-dashboard-check-sys-wallet**)
- Signin with test SYS wallet (empty) and add test DOGE wallet (non-empty) from within the dashboard (**npm run coind-dashboard-check-empty-nonempty-wallets**)
- Signin with test SYS wallet and add test DOGE wallet from within the dashboard (**npm run coind-signin-add-2nd-wallet**)
- Signin with test SYS wallet and test receive coin modal (**npm run coind-dashboard-check-receive-coin**)
- Signin with test SYS wallet and test send coin modal fields (**npm run coind-dashboard-check-send-keying**)
- Signin with test SYS wallet, send 10 SYS to self address, check that 10 SYS were spent and received (**npm run coind-dashboard-check-send-coin**)

## Iguana ##
- Singin w/ SYS coin (**npm run iguana-signin**)
- Select 3 coins via addcoin modal (**npm run iguana-check-addcoin-modal**)
- Singin w/ SYS coin and add DOGE coin from within the dashboard (**npm run iguana-signin-add-2nd-wallet**)
- Singin w/ SYS and DOGE coins (**npm run iguana-signin-2-empty-wallets**)
- Signup w/ SYS coin (**npm run iguana-signup**)
- Signin with test SYS wallet, send 10 SYS to self address, check that 10 SYS were spent and received (**npm run iguana-dashboard-send-coin**)

# Headless #
sudo apt-get install xvfb

**Usage (terminal):**
```
Xvfb :99 &
export DISPLAY=:99
```

Tested browsers in headless mode: Firefox, Chrome

# How to run tests #
cd to tests folder

**npm coind_test test/e2e/testnamehere.js** to run a sequence of test modules

or

**npm coind_test test/e2e/module/testnamehere.js** to run a specific test module

##Test modules##
You can combine multiple test modules into a single test by using extend function. This allows to reuse the same browser session to run tests in different order or repeating steps under different conditions or with different input values.

```
var ext = require('../../nightwatch.conf.js');

module.exports = ext.extend(module.exports, require('./module/modulenamehere'));
module.exports = ext.extend(module.exports, require('./module/anothermodulenamehere'));
```

##Responsive testing##
run **daemon_scripts/iguana-responsive-all.sh** to execute all iguana specific tests and capture screenshots under different resolutions. Check screenshots/iguana folder after script is finished.

run **daemon_scripts/coind-responsive-all.sh** to get coind responsive testing. Check screenshots/coind folder after script is finished.

**List of resolutions:**
```
360 x 480
400 x 800
480 x 320
540 x 960
568 x 480
600 x 800
640 x 480
768 x 1024
800 x 600
960 x 1280
1024 x 768
1136 x 640
1280 x 768
1360 x 768
1440 x 900
1600 x 900
1680 x 1050
1920 x 1080
```

**Automated coind/iguana cleanup and regtest**
Shell scripts assume default coind data location.
```
./syscoin
./dogecoin
```
**clean.sh** wipe out coind regtest folders and restart coin daemons

**encrypt.sh** wipe out coind regtest folders, stop dogecoind, start syscoind, encrypt syscoind w/ "test test" passphrase

**encrypt2.sh** wipe out coind regtest folders, encrypt syscoind and dogecoind w/ "test test" passphrase

**clean-iguana.sh** runs the same set of commands as in **clean.sh**, removes DOGE, SYS files from iguana/DB, iguana/tmp folders

Check package.json for more examples on how to run tests.