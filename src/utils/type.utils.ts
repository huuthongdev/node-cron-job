export enum typeOfVale {
    number = 'number',
    string = 'string',
    object = 'object',
}

export function isArray(array: any, mustHaveValue = false, typeOfItemRequired?: typeOfVale) {
    if (!array) return false;
    if (!Array.isArray(array)) return false;
    if (mustHaveValue && array.length === 0) return false;
    if (typeOfItemRequired) return array.every(v => typeof v === typeOfItemRequired)
    return true;
}

export function isBoolean(value: any) { return typeof value === 'boolean' };

export function isEmail(text: string) {
    if (!text) return false;
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(text);
}

export function isFunction(functionToCheck: any) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export function isUuid(uuid: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

export function isNumber(num: any) {
    return typeof num === 'number' && !isNaN(num);
}

export function isPhoneNumber(phone: string) {
    if (!phone) return false;
    return /^(\+?84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/.test(phone);
}