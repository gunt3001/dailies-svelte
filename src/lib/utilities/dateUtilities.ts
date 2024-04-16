/**
 * Checks if two dates represent the same calendar date (year, month, and day).
 * @param date1 - The first date to compare.
 * @param date2 - The second date to compare.
 * @returns `true` if the dates are the same, `false` otherwise.
 */
export function isSameDate(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

/**
 * Formats a date object into "YYYY-MM-DD" format in the local timezone.
 * 
 * @param date - The date object to be formatted.
 * @returns The formatted date string in "YYYY-MM-DD" format.
 */
export function formatDate(date: Date) {
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    return dateStr;

}

/**
 * Parse a date in the format "YYYY-MM-DD" into the Date object.
 * 
 * @param date - The date string in "YYYY-MM-DD" format.
 */
export function parseDate(date: string) {

    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7));
    const day = parseInt(date.substring(8, 10));

    return new Date(year, month - 1, day);

}