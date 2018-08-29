#!/usr/bin/env bash

#== Bash helpers ==

function info {
  echo " "
  echo "--> $1"
  echo " "
}

#== Provision script ==

info "Provision-script user: `whoami`"

info "Restart web-stack"
service nginx restart
service gunicorn restart
info "Done!"

info "Set EXPORT variables"
export DJNCI_DEBUG=true
export DJNCI_GRAPHIQL=true
export SMTP_HOST=smtp.postmarkapp.com
export SMTP_USER=37f68003-3c75-4054-a811-5d6d00319593
export SMTP_PASSWORD=37f68003-3c75-4054-a811-5d6d00319593
export SECRET_KEY="m97y&6tvt83#%%x7^eudo&^7!g!lpe4#_9q)9*1j@cd=f7x$m@"
export STRIPE_LIVE_PUBLIC_KEY=pk_live_I0aXq1wrhAdM6vxFA55zsOiZ
export STRIPE_LIVE_PRIVATE_KEY=sk_live_8uvyONsuvLAXubtwS0jxGY3s
export STRIPE_TEST_PUBLIC_KEY=pk_test_2iONQfKDphIIa8M9W1hkisQq
export STRIPE_TEST_SECRET_KEY=sk_test_pUX8VZ1DxHoxOLKPRZaJePID
export SENTRY_DSN_URL="https://1111:7e4713788b0248bdb2b8632395392b22@sentry.io/1264473"
info "Done!"
