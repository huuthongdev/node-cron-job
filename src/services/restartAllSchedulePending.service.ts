import { getRepository } from "typeorm";
import { Schedule } from "../database/postgres/entity/schedule.entity";
import { ExecCronTaskService, AsyncForEachUtil } from "../refs";

export default async function restartAllSchedulePendingService() {
    const schedulesRepo = getRepository(Schedule);
    const schedules = await schedulesRepo.find();
    const scheudlesPending = schedules.filter(v => v.status === 'pending');

    let taskSuccess = 0;

    await AsyncForEachUtil(scheudlesPending, async (item: Schedule) => {
        await ExecCronTaskService(item)
            .then(() => taskSuccess++)
            .catch(err => {
                console.log('••••••••••••••• START ERROR CRON TASK •••••••••••••••');
                console.error(err);
                console.log('••••••••••••••• END ERROR CRON TASK •••••••••••••••\n\n');
            });
    })

    if (taskSuccess) console.log(`••• Restart pending cron tasks (${taskSuccess}/${scheudlesPending.length})`)
}