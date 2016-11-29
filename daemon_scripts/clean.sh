

syscoin=/home/pbca/.syscoin/regtest
mazacoin=/home/pbca/.maza/regtest

rm "$syscoin" -rf
echo "$syscoin removed"

rm "$mazacoin" -rf
echo "$mazacoin removed"

cd ../
npm test