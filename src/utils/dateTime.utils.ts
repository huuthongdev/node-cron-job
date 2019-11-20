export function timeToSeconds(time: any) {
    time = new Date(time);
    return +Math.floor(time.getTime() / 1000).toFixed(0)
}

export function secondsToTime(time: any) {
    return new Date(time * 1000);
}