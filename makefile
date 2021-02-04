build: build-sql build-server

build-docker:
	docker build . --tag donations:latest

build-sql:
	cd sqlite; ./build.sh;

build-server:
	cd server; npm i; npm run build;

start:
	cd server; npm run start:dev;
