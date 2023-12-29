import { credentials } from './config/credentials';
const env = process.env.NODE_ENV || 'local';
console.log(env);

export interface DBConfig {
  // Will be added once Database is Created
  database: string;
  username: string;
  password: string;
  params: {
    dialect: string;
    host: string;
    port?: number;
  };
}
export interface db {
  postgres: DBConfig;
}

export interface Config {
  databaseConnections: db;
}

interface configEnvironment {
  [propName: string]: Config;
}

const config: configEnvironment = credentials;

export default config[env];
