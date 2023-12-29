export interface DBConfig {
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
declare const _default: Config;
export default _default;
