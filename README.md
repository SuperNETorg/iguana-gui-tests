# Iguana GUI Testing Suite

sudo apt-get update

sudo apt-get install openjdk-7-jdk

npm install

npm install will download Selenium v2.53

Other deps:
- Built Iguana GUI
- Iguana Core binary
- Built Syscoin binaries https://github.com/syscoin/syscoin2
- Built Dogecoin binaries https://github.com/dogecoin/dogecoin

Place syscoind, syscoin-cli, dogecoin-cli, dogecoind in daemon_scripts/bin folder

Allow .sh scripts in daemon_scripts dir to execute as binaries

Coind are running in regtest mode to eliminate latency issues

https://bitcoin.org/en/developer-examples#regtest-mode

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