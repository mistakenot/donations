# Explore UK political donations

This is a weekend project to create an API service that allows you to explore all political donations to UK political entities using GraphQL. The idea is to build a platform that allows others to build visulisations and applications on top of.

You can find the services hosted online [here](https://donations-ndqqeqfjhq-nw.a.run.app/).

## Data sources

All data is publicly available from the [Electoral Commission website](http://search.electoralcommission.org.uk/). The code in the [./data](./data) directory is responsible for downloading and processing this data to turn it into a SQLite database. You can find the database schema in the [sqlite](./sqlite) directory.

## Data model

You can explore the full data model on the [GrapgQL](todo) endpoint or by looking at the [SQLite scheme](./sqlite/schema.sql).

## Hosting

Code is included to build the app in a [Docker container](./Dockerfile) and host it on [Google Cloud Run](https://cloud.google.com/run/docs/how-to).

## Commands

Ensure that you have `make` installed. Then you can run:

- `make init` after checkout to install dependencies.
- `make start` to start the development server.
- `make build` to build the data and server locally.
- `make build-docker` to build the server Dockerfile. Make sure you run `make build` first to build the data first.
- `make deploy` to build the container, push to GCR and deploy to Google Cloud Run.

## Directories

The [./data](./data) directory contains code for downloading, cleansing and loading the data into a running Sqlite instance. The [./sqlite](./sqlite) directory contains everything needed to build the database schema. FInally, the [./server](./server) directory contains the [Nest.JS](https://docs.nestjs.com/) service for hosting the GraphQl endpoint.

## Tests

There are a few tests implemented:

- In the [./data](./data) directory. Run `make test-data` from the root directory to run them.
- In the [./server](./server) directory. Run `make test-server` from the root directory to run them.
