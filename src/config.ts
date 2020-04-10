import * as assert from 'assert';

assert(process.env.POSTGRES_USER, 'POSTGRES_USER is not specified');
assert(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD is not specified');
assert(process.env.POSTGRES_DB, 'POSTGRES_DB is not specified');
assert(process.env.DB_HOST, 'DB_HOST is not specified');

export const dbUserName = process.env.POSTGRES_USER;
export const dbPassword = process.env.POSTGRES_PASSWORD;
export const dbName = process.env.POSTGRES_DB;
export const dbHost = process.env.DB_HOST;
export const dbDialect = 'postgres';

