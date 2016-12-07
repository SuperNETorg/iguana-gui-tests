syscoin=/home/pbca/.syscoin/regtest
dogecoin=/home/pbca/.dogecoin/regtest

./daemon_scripts/bin/syscoin-cli stop
./daemon_scripts/bin/dogecoin-cli stop
sleep 6

rm "$syscoin" -rf
echo "$syscoin removed"

rm "$dogecoin" -rf
echo "$dogecoin removed"

./daemon_scripts/bin/syscoind -regtest -daemon
./daemon_scripts/bin/dogecoind -regtest -daemon
sleep 3
./daemon_scripts/bin/syscoin-cli -regtest encryptwallet "test test"
./daemon_scripts/bin/dogecoin-cli -regtest encryptwallet "test test"
sleep 6
./daemon_scripts/bin/syscoind -regtest -daemon
./daemon_scripts/bin/dogecoind -regtest -daemon
sleep 3

./node_modules/.bin/nightwatch --env $1 -t test/e2e/$2