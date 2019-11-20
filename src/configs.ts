
export const EnvVals = process.env;

let Configs = {
    ENV: 'local',
    APP_NAME: 'Cron Job Service',
    APP_VERSION: '1.0.0',
    DB_HOST: '34.67.26.88',
    DB_PORT: 5432,
    DB_USER_NAME: 'postgres',
    DB_USER_PASSWORD: 'postgres',
    DB_NAME: 'postgres'
};

if (typeof EnvVals.DB_HOST !== "undefined") {
    Configs.DB_HOST = EnvVals.DB_HOST;
}
if (typeof EnvVals.DB_PORT !== "undefined") {
    Configs.DB_PORT = parseInt(EnvVals.DB_PORT);
}
if (typeof EnvVals.DB_USER_NAME !== "undefined") {
    Configs.DB_USER_NAME = EnvVals.DB_USER_NAME;
}
if (typeof EnvVals.DB_USER_PASSWORD !== "undefined") {
    Configs.DB_USER_PASSWORD = EnvVals.DB_USER_PASSWORD;
}
if (typeof EnvVals.DB_NAME !== "undefined") {
    Configs.DB_NAME = EnvVals.DB_NAME;
}

export default Configs;
