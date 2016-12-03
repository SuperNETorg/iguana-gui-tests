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

Test coverage so far:
- Encrypt already encrypted sys wallet
- Encrypt unencrypted sys wallet and signin into dashboard
- Signin with test sys wallet and change currency
- Signin with test sys wallet and check empty dashboard
- Signin with test sys wallet and check non-empty dashboard
- Signin with test sys wallet (empty) and add test mzc wallet (non-empty) from within the dashboard
- Signin with test sys wallet and add test mzc wallet from within the dashboard