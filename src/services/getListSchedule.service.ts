import { ThrowPayloadError, ErrorMessage, TypeUtils, Schedule } from '../refs';
import { getRepository } from 'typeorm';

export default async function GetListScheduleService(offset = 0, limit = 10) {
    try {
        // Validate
        let errors: any = {};
        if (!TypeUtils.isNumber(+offset)) errors['offset'] = ErrorMessage.MUST_BE_NUMBER;
        if (!TypeUtils.isNumber(+limit)) errors['limit'] = ErrorMessage.MUST_BE_NUMBER;
        ThrowPayloadError(errors);

        const schedules = await getRepository(Schedule).findAndCount({
            skip: +offset,
            take: +limit,
            order: {
                id: 'DESC'
            }
        });

        return {
            data: schedules[0],
            count: schedules[1]
        };
    } catch (err) {
        ThrowPayloadError(err);
    }
}