syscoin=/home/pbca/.syscoin/regtest
mazacoin=/home/pbca/.maza/regtest

./bin/syscoin-cli stop
#./bin/maza-cli stop
sleep 4

rm "$syscoin" -rf
echo "$syscoin removed"

#rm "$mazacoin" -rf
#echo "$mazacoin removed"

./bin/syscoind -regtest -daemon

#cd ../
#npm test