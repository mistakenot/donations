#!/usr/bin/env bash
#
# Build the SQLite database from the source data files.
# Requires wget and sqlite installed.

set -e

rm -f database.sqlite

cat ./schema.sql | sqlite3 -bail ./database.sqlite

cp ./database.sqlite ../data
