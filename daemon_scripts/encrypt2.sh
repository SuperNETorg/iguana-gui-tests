syscoin=/home/pbca/.syscoin/regtest
dogecoin=/home/pbca/.dogecoin/regtest

./bin/syscoin-cli stop
./bin/dogecoin-cli stop
sleep 4

rm "$syscoin" -rf
echo "$syscoin removed"

rm "$dogecoin" -rf
echo "$dogecoin removed"

./bin/syscoind -regtest -daemon
./bin/dogecoind -regtest -daemon
sleep 1
./bin/syscoin-cli -regtest encryptwallet "test test"
./bin/dogecoin-cli -regtest encryptwallet "test test"
sleep 5
./bin/syscoind -regtest -daemon
./bin/dogecoind -regtest -daemon
sleep 1

#cd ../
#npm test