./daemon_scripts/bin/syscoin-cli stop
./daemon_scripts/bin/dogecoin-cli stop
sleep 6

rm "daemon_scripts/bin/iguanacore/iguana/tmp/SYS" -rf
rm "daemon_scripts/bin/iguanacore/iguana/DB/SYS" -rf
rm "daemon_scripts/bin/iguanacore/iguana/DB/purgeable/SYS" -rf
rm "daemon_scripts/bin/iguanacore/iguana/DB/ro/SYS" -rf

rm "daemon_scripts/bin/iguanacore/iguana/tmp/DOGE" -rf
rm "daemon_scripts/bin/iguanacore/iguana/DB/DOGE" -rf
rm "daemon_scripts/bin/iguanacore/iguana/DB/purgeable/DOGE" -rf
rm "daemon_scripts/bin/iguanacore/iguana/DB/ro/DOGE" -rf

cd "daemon_scripts/bin/iguanacore/iguana/confs"
rm $(ls -I '*.txt' -I '*.conf' -I '.tmpmarker')
cd ../../../../../

echo "$syscoin removed"

rm "$dogecoin" -rf
echo "$dogecoin removed"

./daemon_scripts/bin/syscoind -regtest -daemon
./daemon_scripts/bin/dogecoind -regtest -daemon
sleep 4

npm test test/e2e/$1