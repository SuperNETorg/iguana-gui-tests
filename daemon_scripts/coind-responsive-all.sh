rm "./screenshots" -rf

Xvfb :99 &
export DISPLAY=:99
npm run encrypt coind_responsive add-wallet.js
npm run clean coind_responsive signup-w-signin.js
npm run clean coind_responsive signup-success.js
npm run encrypt coind_responsive signup-error.js
npm run encrypt coind_responsive signin-change-currency.js
npm run encrypt2 coind_responsive signin-add-2nd-wallet.js
npm run encrypt coind_responsive dashboard-empty-wallet.js
npm run encrypt coind_responsive dashboard-check-sys-wallet.js
npm run encrypt coind_responsive dashboard-check-send-coin.js
npm run encrypt coind_responsive dashboard-check-send-coin.js
npm run encrypt coind_responsive dashboard-check-send-coin-keying.js
npm run encrypt coind_responsive dashboard-check-receive-coin.js
npm run encrypt2 coind_responsive dashboard-check-empty-nonempty-wallets.js
npm run encrypt2 coind_responsive dashboard-check-2-nonempty-wallets.js

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