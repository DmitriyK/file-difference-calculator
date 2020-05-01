install: 
		npm install
start: 
		npx babel-node src/bin/gendiff.js -h
build:
		npm run build
publish: 
		npm publish --dry-run
lint:
		npx eslint .