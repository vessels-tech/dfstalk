
PATH := node_modules/.bin:$(PATH)

PROJECT = "DFSTalk"
dir = $(shell pwd)
include .config
include ./env/env_compiled


env_dir := $(dir)/env

#Add in admin node modules executable
PATH := $(admin_dir)/node_modules/.bin:$(PATH)

##
# Env Setup
## 

env:
	cat ${env_dir}/public.${stage}.sh ${env_dir}/private.${stage}.sh > ${env_dir}/env_compiled

switch:
	@echo switching to stage: ${stage}
	@echo 'export stage=${stage}\n' > .config
	@make env
	@firebase use ${stage}

switch-dev:
	make switch stage="development"

switch-prod:
	make switch stage="production"


##
# Local Development
##

build:
	cd $(dir)/functions; yarn run build
	# cp $(dir)/functions/src/index.js $(dir)/functions/lib/index.js

watch:
	cd $(dir)/functions; yarn run watch

lint: 
	cd $(dir)/functions; yarn run lint

run-lt: 
	@make env
	@lt --subdomain ${LT_SUBDOMAIN} --port 5000

run-local:
	@make env
	./_run_local.sh

run-swagger-ui:
	@make env
	open "http://localhost:8000/docs/client_swagger_local.html"
	python -m SimpleHTTPServer 

#update the local swagger without changing the base path or other params
update-local-swagger:
	cat swagger.local_head.yaml > swagger.local.yaml
	tail +19 swagger.yaml >> swagger.local.yaml

##
# Tests
##
test-unit:
	source ${env_dir}/env_compiled && \
		cd ${dir}/functions && \
		yarn run unit

test-service:
	source ${env_dir}/env_compiled && \
		cd ${dir}/functions && \
		yarn run service

##
# Deployment
##
deploy:
	# @make env lint build
	firebase functions:config:set \
		config.verbose_log=${VERBOSE_LOG} \
		config.api_key=${API_KEY} \
		config.bucket_name=${BUCKET_NAME} \
		config.project_id=${PROJECT_ID}

	firebase deploy --only functions

deploy-public:
	# @make env lint build test-unit test-service
	@make env
	firebase deploy --only hosting


.PHONY: switch switch-dev swich-prod env