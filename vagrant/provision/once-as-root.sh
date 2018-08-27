#!/usr/bin/env bash

#== Import script args ==

timezone=$(echo "$1")

#== Bash helpers ==

function info {
  echo " "
  echo "--> $1"
  echo " "
}

#== Provision script ==

info "Provision-script user: `whoami`"

export DEBIAN_FRONTEND=noninteractive

info "Configure timezone"
timedatectl set-timezone ${timezone} --no-ask-password

sudo apt install build-essential zlib1g-dev libssl-dev sqlite3 libsqlite3-dev virtualenv

wget https://www.python.org/ftp/python/3.6.6/Python-3.6.6.tgz
tar xf Python-3.6.6.tgz
cd Python-3.6.6
./configure
make
make test
sudo make install


sudo pip3.6 install -r /app/requirements.txt


# Setup Gunicorn
# Setup .socket file
# setup .service file
# setup nginx
# copy static django files to /static on /var/www/html
