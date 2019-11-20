import Axios from "axios";
import cron from 'node-cron';
import { getRepository } from "typeorm";

import { Schedule, Types, ObjectUtils, CreateScheduleLogService, ServerError } from "../refs";

export async function handleCallApi(apiURL: string, method: string, headers: object, payload: object) {
    const configs: any = {
        baseURL: apiURL,
        method,
        headers,
        data: payload || {},
    }

    return Axios(configs)
        .catch(err => {
            err.status = ObjectUtils.getIn(err, 'response.status', 3001);
            err.message = ObjectUtils.getIn(err, 'response.data.message', '');
            throw err;
        })
}

export default async function ExecCronTaskService(schedule: Schedule) {
    const scheduleRespo = getRepository(Schedule);

    const { cronExpression } = schedule;
    const { apiURL, method, headers, payload } = JSON.parse(schedule.apiConfigs);
    try {
        const task: any = cron.schedule(cronExpression, async () => {
            // ======================= Check current schedule =======================
            const currentSchedule = await scheduleRespo.findOne(schedule.id);
            const isLastTask = currentSchedule.frequencyCount === currentSchedule.frequency - 1;

            const { status, frequencyCount } = currentSchedule;

            // ======================= Destroy =======================
            if (status === Types.ScheduleStatus.Destroyed) {
                return task.destroy();
            }

            if (status === Types.ScheduleStatus.Pending) {
                // ======================= Handle section =======================
                try {
                    // Actions
                    await handleCallApi(apiURL, method, headers, payload)
                        .catch(async err => {
                            // If error status === 403, destroy task
                            if (err.status === 403) {
                                await scheduleRespo.update(currentSchedule, { status: Types.ScheduleStatus.Destroyed });
                                task.destroy();
                            }

                            throw err;
                        });

                    if (isLastTask) {
                        // Update status
                        await scheduleRespo.update(currentSchedule, { status: Types.ScheduleStatus.Completed, frequencyCount: frequencyCount + 1 });

                        // Destroy
                        task.destroy();
                    } else {
                        // Increase frequencyCount
                        await scheduleRespo.update(currentSchedule, { frequencyCount: frequencyCount + 1 });
                    }

                } catch (error) {
                    if (error.status === 416) return;
                    
                    CreateScheduleLogService({
                        scheduleId: schedule.id,
                        message: error.message,
                        status: error.status,
                        frequency: frequencyCount + 1,
                    })
                }
            }

        }, {
            scheduled: false
        });

        task.start();
    } catch (error) {
        throw new ServerError('Cannot not start cron job', 400);
    }
}