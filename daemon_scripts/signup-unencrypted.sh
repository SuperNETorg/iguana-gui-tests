syscoin=/home/pbca/.syscoin/regtest
dogecoin=/home/pbca/.dogecoin/regtest

./bin/syscoin-cli stop
#./bin/dogecoin-cli stop
sleep 4

rm "$syscoin" -rf
echo "$syscoin removed"

#rm "$dogecoin" -rf
#echo "$dogecoin removed"

./bin/syscoind -regtest -daemon
sleep 4

cd ../
npm test test/e2e/signup-unencrypted.js