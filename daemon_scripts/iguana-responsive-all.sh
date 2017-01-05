Xvfb :99 &
export DISPLAY=:99
npm run clean-iguana iguana_responsive iguana-signup.js
npm run clean-iguana iguana_responsive iguana-signin.js
npm run clean-iguana iguana iguana-check-addcoin-modal.js
npm run clean-iguana iguana_responsive iguana-signin-2-empty-wallets.js
npm run clean-iguana iguana_responsive iguana-signin-add-2nd-wallet.js
echo "done"