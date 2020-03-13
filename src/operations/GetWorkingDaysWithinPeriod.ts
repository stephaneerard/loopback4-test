export const MILISECONDS_PER_DAY = 86400 * 1000; // Day in milliseconds

//@see https://partialclass.blogspot.com/2011/07/calculating-working-days-between-two.html
// slightly modified by Stéphane Erard <stephane.erard@dietsmann.com> 2020

export function GetWorkingDaysWithinPeriod(from: Date, to: Date) {

    // Validate input
    if (to < from)
        return 0;

    // Calculate days between dates

    from.setHours(0, 0, 0, 1);  // Start just after midnight
    to.setHours(23, 59, 59, 999);  // End just before midnight
    const diff = <number><unknown>to - <number><unknown>from;  // Milliseconds between datetime objects
    let days = Math.ceil(diff / MILISECONDS_PER_DAY);

    // Subtract two weekend days for every week in between
    const weeks = Math.floor(days / 7);
    days = days - (weeks * 2);

    // Handle special cases
    const startDay = from.getDay();
    const endDay = to.getDay();

    // Remove weekend not previously removed.
    if (startDay - endDay > 1)
        days = days - 2;

    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay === 0 && endDay !== 6)
        days = days - 1

    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay === 6 && startDay !== 0)
        days = days - 1

    return days;
}
