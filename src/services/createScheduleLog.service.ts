import { getRepository } from "typeorm";

import { ErrorMessage, ThrowPayloadError, ScheduleLog, DateUtils } from "../refs";

interface CreateScheduleLogPayload {
    scheduleId: number,
    message: string,
    status: number,
    frequency: number,
}

async function validate(payload: CreateScheduleLogPayload) {
    const { scheduleId, message, status, frequency } = payload;
    let errors: any = {};

    // ======================= REQUIRED =======================
    if (!scheduleId) errors['scheduleId'] = ErrorMessage.MUST_BE_PROVIDED;
    if (!message) errors['message'] = ErrorMessage.MUST_BE_PROVIDED;
    if (!payload) errors['payload'] = ErrorMessage.MUST_BE_PROVIDED;
    if (!status) errors['status'] = ErrorMessage.MUST_BE_PROVIDED;
    if (typeof frequency !== 'number') errors['frequency'] = ErrorMessage.MUST_BE_PROVIDED;
    ThrowPayloadError(errors);

}

export default async function CreateScheduleLogService(payload: CreateScheduleLogPayload) {
    await validate(payload);
    const { scheduleId, message, status, frequency } = payload;

    const scheduleLog = new ScheduleLog();
    scheduleLog.scheduleId = scheduleId;
    scheduleLog.message = message;
    scheduleLog.status = status;
    scheduleLog.createdAt = DateUtils.timeToSeconds(Date.now());
    scheduleLog.frequency = frequency;

    await getRepository(ScheduleLog).save(scheduleLog);

    return scheduleLog;
}