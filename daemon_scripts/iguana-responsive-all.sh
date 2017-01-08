rm "./screenshots" -rf

Xvfb :99 &
export DISPLAY=:99
npm run clean-iguana iguana_responsive iguana-signup.js skip
npm run clean-iguana iguana_responsive iguana-signin.js skip
npm run clean-iguana iguana iguana-check-addcoin-modal.js skip
npm run clean-iguana iguana_responsive iguana-signin-2-empty-wallets.js skip
npm run clean-iguana iguana_responsive iguana-signin-add-2nd-wallet.js skip

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