#
# WEB TOOLS v.0.1
#
# This file handles the setup of the development tools for front-end web and digital. Will need updating.
#
# @modernfidelity
#
#


# Starting point for installs
# -------------------------------

init:

# Install everything
# -------------------------------

install: init install-machine install-frontend install-backend

# Install main developer software
# -------------------------------

install-machine:
	ruby -e '$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)'
	brew install node
	brew install docker-machine
	brew install docker


# Install frontend software
# -------------------------------

install-frontend:
	sudo gem install jekyll
	sudo gem install scss-lint
	sudo gem install sass
	sudo gem install compass



# Install backend software
# -------------------------------

install-backend:
	curl -sS https://getcomposer.org/installer | php
	composer install




deploy: init

#build: install run-all

#run-all: run-imports run-filters run-ranks
#run-imports:
#run-filters:
#run-ranks:

tests:
	./bin/phpunit -c docroot

