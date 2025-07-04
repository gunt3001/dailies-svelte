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

/**
 * Iterate all the dates between the given dates, inclusive of both dates
 * 
 * @param from - starting date
 * @param to - ending date
 * @returns Array of all the dates from starting to ending date
 */
export function iterateDates(from: Date, to: Date): Date[] {

    // If to date is after from date, return empty array
    if (to < from) {
        return [];
    }

    let returnDates: Date[] = [];
    let date = new Date(from);
    while (!isSameDate(date, to)) {
        returnDates.push(date);

        date = new Date(date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1);
    }
    // Add last date
    returnDates.push(to);

    return returnDates;
}

/**
 * Generates an iterator that yields year-month pairs between the given dates
 * inclusive of both starting and ending months.
 * @param from The starting date.
 * @param to The ending date.
 * @returns An iterator that yields objects with `year` and `month`. Month is 1-based.
 */
export function* iterateMonths(from: Date, to: Date) {
    let month = from.getMonth();
    let year = from.getFullYear();
    while (year < to.getFullYear() || (year === to.getFullYear() && month <= to.getMonth())) {
        yield { year, month: month + 1 };
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
    }
}

/**
 * Get the number of day difference between two dates returned as string
 */
export function getDayDifferenceText(date: Date, inReferenceTo: Date): string {
    // Remove both time components
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    inReferenceTo = new Date(
        inReferenceTo.getFullYear(),
        inReferenceTo.getMonth(),
        inReferenceTo.getDate(),
    );

    // Calculate the time difference in milliseconds
    const timeDifference = date.getTime() - inReferenceTo.getTime();

    // Convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference < -1) {
        return (
            (Math.round(daysDifference) * -1).toLocaleString() + " days ago"
        );
    } else if (daysDifference == -1) {
        return "Yesterday";
    } else if (daysDifference == 1) {
        return "Tomorrow";
    } else if (daysDifference >= 1) {
        return (
            "in " + Math.round(daysDifference).toLocaleString() + " days"
        );
    } else {
        return "Today";
    }
}