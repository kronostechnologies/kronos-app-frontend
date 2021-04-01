BASE_DIR := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

.PHONY: all setup check compile test package

all: setup check compile test package
setup:
	@asdf plugin update nodejs || (asdf plugin add nodejs && ~/.asdf/plugins/nodejs/bin/import-release-team-keyring)
	@asdf plugin update yarn || asdf plugin add yarn
	@asdf install
	@yarn --cwd "$(BASE_DIR)"

check:
	@yarn eslint

compile:
	@yarn build

test:
	@yarn test

package:
	@echo "Nothing to package"
