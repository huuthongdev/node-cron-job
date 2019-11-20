import { app, Configs } from './refs';
import { connectPostgresDatabase } from './database/postgres';

async function main() {
    const port = process.env.PORT || 4100;
    console.log(`\n###### Server information ######\n- Public port:${port}\n- Database host: ${Configs.DB_HOST}\n- Database port: ${Configs.DB_PORT}\n- Database name: ${Configs.DB_NAME}\n`)

    await connectPostgresDatabase();

    app.listen(port, () => {
        console.log(`••• Server start success.\n`);
    });
}

main();
