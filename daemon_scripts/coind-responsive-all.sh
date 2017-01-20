pkill iguana

rm "./screenshots" -rf

Xvfb :99 &
export DISPLAY=:99
npm run encrypt coind_responsive add-wallet.js skip
pkill chromedriver
pkill java
npm run clean coind_responsive signup-w-signin.js skip
pkill chromedriver
pkill java
npm run clean coind_responsive signup-success.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive signup-error.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive signin-change-currency.js skip
pkill chromedriver
pkill java
npm run encrypt coind dashboard-check-mobile-mode.js skip
pkill chromedriver
pkill java
npm run encrypt2 coind_responsive signin-add-2nd-wallet.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive dashboard-empty-wallet.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive dashboard-check-sys-wallet.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive dashboard-check-send-coin.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive dashboard-check-send-coin.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive dashboard-check-send-coin-keying.js skip
pkill chromedriver
pkill java
npm run encrypt coind_responsive dashboard-check-receive-coin.js skip
pkill chromedriver
pkill java
npm run encrypt2 coind_responsive dashboard-check-empty-nonempty-wallets.js skip
pkill chromedriver
pkill java
npm run encrypt2 coind_responsive dashboard-check-2-nonempty-wallets.js skip
pkill chromedriver
pkill java

for i in `seq 1 4`;
do
  md5sum `find ./screenshots -type f` | sort -k1 | uniq -w32 -d | xargs rm -fv
done

for i in `seq 1 4`;
do
  md5sum `find ./screenshots -type f` | sort -k1 | uniq -w32 -d | xargs rm -fv
done

find ./screenshots -type f | xargs -n 1 bash -c 'convert "$0" "${0%.*}.jpg"'
find ./screenshots -type f -name "*.png" | xargs rm -fv
echo "done"