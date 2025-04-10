// Utilities for date formatting

/**
 * Converts a date string to a long date format, including the day of week
 * e.g. "Sunday, January 1, 2023"
 * @param date - The date object
 * @returns The long date string.
 */
export function toLongDate(date: Date): string {
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}