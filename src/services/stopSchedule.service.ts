import { getRepository } from "typeorm";
import { Schedule, ServerError, ErrorMessage, Types } from "../refs";

export default async function StopScheduleService(scheduleId: number) {
    const scheduleRespo = getRepository(Schedule);

    // Check exist
    const schedule = await scheduleRespo.findOne(scheduleId);

    if (!schedule) throw new ServerError(ErrorMessage.CANNOT_FIND_SCHEDULE, 404);
    if (schedule.status === Types.ScheduleStatus.Destroyed) throw new ServerError(ErrorMessage.SCHEDULE_WAS_DETROYED);
    if (schedule.status === Types.ScheduleStatus.Stoped) throw new ServerError(ErrorMessage.SCHEDULE_WAS_STOPED);

    await scheduleRespo.update(schedule, { status: Types.ScheduleStatus.Stoped });

    return {
        ...schedule,
        status: Types.ScheduleStatus.Stoped,
    }
}