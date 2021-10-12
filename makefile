.PHONY: deploy

init:
	mkdir -p ./deploy/{public,cloud}

clean:
	rm -rf ./dist
	rm -rf ./deploy/{public,cloud}

build: clean
	npm run build
	cp -Rv ./dist/ ./deploy/public/
	cd ./cloud ; npx tsc

deploy: build
	cd ./deploy; b4a deploy
