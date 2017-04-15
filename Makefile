BOWER_DIR = bower_components
NODE_IMG = node:7.8-alpine
NODE_MODULES_DIR = node_modules
NODE_ENV=production

$(NODE_MODULES_DIR): package.json
	@docker run --rm \
		-v $(CURDIR):/data \
		-w /data \
		$(SET_UID) \
		$(NODE_IMG) \
		npm install --no-shrinkwrap --no-optional

dep: $(NODE_MODULES_DIR)

build: dep
	@docker run --rm \
		-v $(CURDIR):/data \
		-w /data \
		-e NODE_ENV=$(NODE_ENV) \
		$(NODE_IMG) \
		npm run build

watch: dep build
	@docker run --rm -it \
		-v $(CURDIR):/data \
		-w /data \
		-e NODE_ENV=$(NODE_ENV) \

		$(NODE_IMG) \
		npm run watch

serve: dep
	@docker run --rm -it \
		-v $(CURDIR):/data \
		-w /data \
		-p 3000:3000 \
		-e NODE_ENV=$(NODE_ENV) \
		$(NODE_IMG) \
		npm run serve

clean:
	@docker run --rm \
		-v $(CURDIR):/data \
		-w /data \
		$(NODE_IMG) \
		sh -c "trap exit TERM; npm run clean"
