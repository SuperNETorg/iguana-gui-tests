kill $(pgrep chrome)
killall -v chrome
pkill chrome
kill `ps -ef | grep chrome | grep -v grep`
kill $(pgrep chromedriver)
killall -v chromedriver
pkill chromedriver
kill `ps -ef | grep chromedriver | grep -v grep`