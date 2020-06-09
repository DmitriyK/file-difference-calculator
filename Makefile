install: 
		npm install
start: 
		npx babel-node src/bin/gendiff.js --format json __tests__/__fixtures__/before.ini __tests__/__fixtures__/after.ini
build:
		npm run build
publish: 
		npm publish --dry-run
lint:
		npx eslint .
test:
		npm test
test-coverage:
		npm test -- --coverage
.PHONY: test