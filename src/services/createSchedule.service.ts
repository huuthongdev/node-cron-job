import cron from 'node-cron';
import { getRepository } from "typeorm";

import { Types, ErrorMessage, ThrowPayloadError, Schedule, DateUtils, ExecCronTaskService } from "../refs";

export interface CreateSchedulePayload {
    description?: string,
    cronExpression: string,
    frequency: number,
    // APIS 
    apiURL: string,
    method: Types.ApiMethodTypes,
    payload?: any,
    headers?: any,
}

async function validates(schedulePayload: CreateSchedulePayload) {
    const { method, payload, cronExpression, frequency, apiURL } = schedulePayload;
    let errors: any = {};

    // ======================= REQUIRED =======================
    if (!apiURL) errors['apiURL'] = ErrorMessage.MUST_BE_PROVIDED;
    if (!method) errors['method'] = ErrorMessage.MUST_BE_PROVIDED;
    if (!payload) errors['payload'] = ErrorMessage.MUST_BE_PROVIDED;
    if (!cronExpression) errors['cronExpression'] = ErrorMessage.MUST_BE_PROVIDED;
    if (!frequency) errors['frequency'] = ErrorMessage.MUST_BE_PROVIDED;
    ThrowPayloadError(errors);

    // ======================= TYPE =======================
    if (!Object.values(Types.ApiMethodTypes).includes(method)) errors['method'] = ErrorMessage.INVALID_METHOD;
    if (typeof payload !== 'object') errors['object'] = ErrorMessage.MUST_BE_OBJECT;
    if (typeof frequency !== 'number') errors['frequency'] = ErrorMessage.MUST_BE_NUMBER;
    ThrowPayloadError(errors);

    // ======================= VALID =======================
    if (frequency === 0) errors['frequency'] = 'Frequency must be more 0';
    if (!cron.validate(cronExpression)) errors['cronExpression'] = 'Invalid cron expression';
    ThrowPayloadError(errors);
}

export default async function CreateScheduleService(schedulePayload: CreateSchedulePayload) {
    await validates(schedulePayload);
    const { description, method, payload, headers, cronExpression, frequency, apiURL } = schedulePayload;
    const scheduleRespo = getRepository(Schedule);

    const schedule = new Schedule();
    schedule.cronExpression = cronExpression;
    schedule.description = description;
    schedule.frequency = frequency;
    schedule.apiConfigs = JSON.stringify({
        apiURL,
        method,
        payload,
        headers: headers || {},
    });
    schedule.createdAt = DateUtils.timeToSeconds(Date.now());

    await scheduleRespo.save(schedule);

    await ExecCronTaskService(schedule);
    return schedule;
}