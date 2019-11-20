import { ObjectUtils, ErrorMessage } from "../refs";

export class ServerError extends Error {
    status: number;
    errors: any;
    constructor(msg: string, status?: number, errors?: any) {
        super(msg);
        if (status) this.status = status;
        if (errors) this.errors = errors;
    }
}

export function ThrowPayloadError(errors: any) {
    if (ObjectUtils.isHasValue(errors)) throw new ServerError(ErrorMessage.INVALID_PAYLOAD, 400, errors);
}