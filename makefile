.PHONY: build test

install: ## Install dependencies
	npm install

build: ## Build with babel
	@ mkdir -p build
	@ ./node_modules/.bin/babel src/ --out-dir build/ --compact true
	@ chmod +x build/rdcli.js

run: ## Run with babel
	@ ./node_modules/.bin/babel-node src/rdcli.js $(filter-out $@,$(MAKECMDGOALS))

dev: ## Run with babel
	@ NODE_ENV=dev ./node_modules/.bin/babel-node src/rdcli.js $(filter-out $@,$(MAKECMDGOALS))

debug: ## Run with babel (with debug)
	@ DEBUG=torrent,download,connect,unrestrict ./node_modules/.bin/babel-node src/rdcli.js $(filter-out $@,$(MAKECMDGOALS))

test: ## Run unit tests
	@ cp -n config/test.json.dist config/test.json
	@ NODE_ENV=test ./node_modules/.bin/mocha -t 9999999 --compilers js:babel-core/register --require babel-polyfill test/setup.js test/specs/*.spec.js

deploy: ## Deploy
	npm publish

lint:
	@ ./node_modules/.bin/eslint src/ test/

lint-fix:
	@ ./node_modules/.bin/eslint --fix src/
