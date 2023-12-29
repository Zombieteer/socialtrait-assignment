#!/bin/bash

DB_HOST=localhost
PG_PORT=5432
DB_NAME=socialtraitdb
DB_USER=socialtrait
DB_PASSWORD=socialtrait

PGPASSWORD="$DB_PASSWORD" psql -U ${DB_USER} -d ${DB_NAME} -h ${DB_HOST} -p $PG_PORT -f scripts/drop-tables.sql
PGPASSWORD="$DB_PASSWORD" psql -U ${DB_USER} -d ${DB_NAME} -h ${DB_HOST} -p $PG_PORT -f schema/initSchema.sql
