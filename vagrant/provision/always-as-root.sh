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

export DJNCI_DEBUG=true
export DJNCI_GRAPHIQL=true
cd /app
bash -c 'python3.6 manage.py makemigrations && python3.6 manage.py migrate && python3.6 manage.py runserver 0.0.0.0:9000'