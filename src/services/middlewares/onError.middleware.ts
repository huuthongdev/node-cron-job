import { Request, NextFunction } from 'express';
import { ServerError } from '../../refs';

export function OnError(_: Request, res: any, next: NextFunction) {
    res.onError = (error: ServerError) => {
        if (!error.status) console.log(error);
        let body: any = {
            status: error.status || 500,
            message: error.status ? error.message : ErrorMessage.INTERNAL_SERVER_ERROR,
            errors: error.errors || {}
        };
        res.status(error.status || 500).send(body);
    }
    next();
}

export const ErrorMessage = {
    PERMISSION_DENIED: 'Permission denied.',
    ACCESS_DENIED: 'Access denied.',
    INTERNAL_SERVER_ERROR: 'Internal Server Error.',
    UNAUTHORZIED: 'Unauthorzied.',
    
    MUST_BE_NUMBER: 'Must be number.',
    MUST_BE_STRING: 'Must be string.',
    MUST_BE_OBJECT: 'Must be object.',
    MUST_BE_ARRAY: 'Must be array.',
    MUST_BE_PROVIDED: 'Must be provided.',
    
    CANNOT_FIND_USER: 'Cannot find user.',
    CANNOT_FIND_SCHEDULE: 'Cannot find schedule.',

    SCHEDULE_WAS_DETROYED: 'Schedule was destroyed.',
    SCHEDULE_WAS_STOPED: 'Schedule was stoped.',
    SCHEDULE_WAS_STARTED: 'Schedule was started.',

    INVALID_PAYLOAD: 'Invalid payload.',
    INVALID_ROUTE: 'Invalid route.',
    INVALID_METHOD: 'Invalid method.',

    USER_NOT_EXIST: 'User nor exist.',
    USER_IS_DISABLED: 'User is disabled.',
    PASSWORD_INCORRECT: 'Password incorrect.',
}
