import { createConnection, Connection } from "typeorm";

import { Configs } from "../../refs";
import { Schedule } from "./entity/schedule.entity";
import { ScheduleLog } from "./entity/scheduleLog.entity";
import restartAllSchedulePendingService from "../../services/restartAllSchedulePending.service";

async function initDatabase(connection: Connection, isLog: boolean = true) {
    if (isLog) console.log('••• Initialize initial data success.');
}

async function dropDatabase(connection: Connection) {
    await connection.dropDatabase();
    await connection.synchronize();
    console.log(`••• Drop database success.`);
}

export async function connectPostgresDatabase(isDropDatabase = false) {
    await createConnection({
        type: "postgres",
        url: 'postgres://'+Configs.DB_NAME+':'+Configs.DB_USER_NAME+'@'+Configs.DB_HOST+'/'+Configs.DB_USER_PASSWORD,
        maxQueryExecutionTime: 10000,
        cache: false,
        synchronize: true,
        logging: false,
        entities: [
            Schedule,
            ScheduleLog,
        ]
    })
        .then(async (connection: Connection) => {
            console.log(`••• Database connected.`);

            if (isDropDatabase) await dropDatabase(connection);
            await initDatabase(connection);
            await restartAllSchedulePendingService();

            return connection;
        })
        .catch(error => {
            console.error("Database error", error);
            return process.exit(1);
        })


}
