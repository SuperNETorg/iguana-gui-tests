if [ "$3" != "" ]; then
  if [ "$3" = "skip" ]; then
    rm "./screenshots" -rf
  fi
fi

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
sleep 4

./node_modules/.bin/nightwatch --env $1 -t test/e2e/$2