export DATA_DOWNLOAD_URL := "http://search.electoralcommission.org.uk/api/csv/Donations?start={start}&rows={pageSize}&query=&sort=AcceptedDate&order=desc&et=rd&et=pp&et=tp&et=perpar&et=ppm&date=&from=&to=&rptPd=&prePoll=false&postPoll=true&register=gb&register=ni&register=none&isIrishSourceYes=true&isIrishSourceNo=true&includeOutsideSection75=true"
export IMAGE_NAME := eu.gcr.io/$(GCLOUD_PROJECT)/donations:latest

init:
	cd server; npm i; cd ..;

build: build-sql rebuild-data build-server

build-docker:
	docker build . --tag $(IMAGE_NAME)

build-sql:
	cd sqlite; ./build.sh;

build-server:
	cd server; npm i; npm run build;

build-data:
	cd data; npm start;

start:
	cd server; npm run start:dev;

test-data:
	cd data; npm t;

rebuild-data: build-sql build-data
	cp ./data/database.sqlite ./server/db/database.sqlite

deploy:
	docker push $(IMAGE_NAME) && \
	gcloud run deploy donations \
	  --image $(IMAGE_NAME) \
		--allow-unauthenticated \
		--region europe-west2 \
		--platform managed \
		--project $(GCLOUD_PROJECT)

