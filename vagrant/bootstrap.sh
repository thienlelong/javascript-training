#!/usr/bin/env bash

echo '### Updating system ...'
sudo rm -f /etc/resolv.conf
sudo sh -c "echo nameserver 8.8.8.8 > /etc/resolv.conf"
sudo apt-get update -y
sudo apt-get install -y build-essential curl vim libqtwebkit-dev git npm gem

# su -c "source /home/vagrant/myapp/vagrant/user-config.sh" vagrant
echo '### Install Ruby Version Manager ...'
gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
curl -L get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
rvm requirements
rvm install 2.0.0
rvm rubygems current


echo '### Install Node Version Manager'
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh
source ~/.nvm/nvm.sh
nvm install 0.10.22 && nvm alias default 0.10.22


echo '### Install global modules ...'
npm install -g npm
npm install -g grunt-cli
npm install -g bower

echo '### Install Gulp ...'
npm install --global gulp

echo '### Install Sass and Compass'

gem install sass
gem install compass


