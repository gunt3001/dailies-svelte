import { API_ENDPOINT_URL, LEGACY_API_ENDPOINT_URL, LEGACY_API_MODE, NEARBY_ENTRIES_TO_PREFETCH } from "$lib/Constants";
import type IEntries from "$lib/model/IEntries";
import type { ILegacyEntry } from "$lib/model/IEntry";
import type IEntry from "$lib/model/IEntry";
import { formatDate, iterateDates } from "$lib/utilities/dateUtilities";
import { get, writable } from "svelte/store";

function createEntriesStore() {

    const { subscribe, set, update } = writable({} as IEntries);

    const store = {
        subscribe,
        getEntry: async function (date: Date): Promise<IEntry | null> {
            // Convert date to "YYYY-MM-DD" format in local timezone
            const dateStr = formatDate(date);

            // Try fetch entry from the backend if not found in the store
            let entries = get(this);
            if (!(dateStr in entries)) {
                const newEntries = await fetchEntry(date);

                // Update values into store
                for (const [key, value] of Object.entries(newEntries)) {
                    update((entries) => {
                        return { ...entries, [key]: value };
                    });
                }

            };

            // Re-get value from store then try to find entry again
            entries = get(this);
            if (dateStr in entries) {
                return entries[dateStr];
            }
            return null;
        },
        getEntries: async function (from: Date, to: Date): Promise<IEntries> {
            // Convert date to "YYYY-MM-DD" format in local timezone
            const fromDateStr = formatDate(from);
            const toDateStr = formatDate(to);

            // If any of the requested date has no cached entry,
            // fetch the entire thing from backend
            let entries = get(this);
            const hasMissingEntries =
                iterateDates(from, to)
                    .findIndex(x => !(formatDate(x) in entries)) != -1;
            if (hasMissingEntries) {
                const newEntries = await fetchEntries(from, to);

                // Update values into store
                for (const [key, value] of Object.entries(newEntries)) {
                    update((entries) => {
                        return { ...entries, [key]: value };
                    });
                }

            }

            // Return values from the updated store
            entries = get(this);
            let returnEntries = {} as IEntries;
            for (let date of iterateDates(from, to).map(formatDate)) {
                returnEntries[date] = entries[date];
            }

            return returnEntries;
        }
    };

    return store;
}

export const entries = createEntriesStore();

// Helper functions for operations on the entries store

async function fetchEntry(date: Date): Promise<IEntries> {

    if (LEGACY_API_MODE) {
        // In legacy API mode, fetching a single entry already fetches entries
        // for the entire month
        return fetchEntries(date, date);
    }
    else {
        // Modern API should support pulling entries for specific dates
        // For user experience, let's pre-fetch entries close to the date requested too
        const startDate = new Date(date.getFullYear(),
            date.getMonth(), date.getDate() - NEARBY_ENTRIES_TO_PREFETCH);
        const endDate = new Date(date.getFullYear(),
            date.getMonth(), date.getDate() + NEARBY_ENTRIES_TO_PREFETCH);
        return fetchEntries(startDate, endDate);
    }
}

/**
 * Fetch multiple entries from the backend API
 * 
 * @param from start date
 * @param to end date
 * @returns a dictionary of entries
 */
async function fetchEntries(from: Date, to: Date): Promise<IEntries> {
    // Fetch multiple entries from the backend
    const newEntries: IEntries = {};

    if (LEGACY_API_MODE) {
        // Legacy API only support pulling entries on a month-by-month basis
        // Fetch entries for all months in the range

        // Create an array of year and month pairs
        let monthsToFetch: { year: number, month: number }[] = [];
        let date = new Date(from);
        while (!(date.getFullYear() === to.getFullYear() &&
            date.getMonth() === to.getMonth())) {
            monthsToFetch.push({ year: date.getFullYear(), month: date.getMonth() + 1 });
            date.setMonth(date.getMonth() + 1);
        }

        // Fetch entries for each month
        for (const { year, month } of monthsToFetch) {
            const response = await fetch(`${LEGACY_API_ENDPOINT_URL}/Entries?year=${year}&month=${month}`);
            const entries: ILegacyEntry[] = await response.json();

            // Loop through every day of the requested month
            // If the entry is not found, set it to null
            // Otherwise, convert the entry to the new format
            date = new Date(year, month - 1, 1);
            while (date.getMonth() === month - 1) {
                const dateStr = formatDate(date);
                const existingEntry = entries.find((entry) => entry.date.startsWith(dateStr));
                newEntries[dateStr] = existingEntry ? convertToNewFormat(existingEntry) : null;
                date.setDate(date.getDate() + 1);
            }
        }
    }
    else {
        // Modern API should support pulling entries for specific dates
        const startDateStr = formatDate(from);
        const endDateStr = formatDate(to);

        const response =
            await fetch(`${API_ENDPOINT_URL}/entries?from=${startDateStr}&to=${endDateStr}`);
        const entries: IEntry[] = await response.json();
        for (const entry of entries) {
            newEntries[entry.date] = entry;
        }
    }

    return newEntries;

}

function convertToNewFormat(entry: ILegacyEntry): IEntry {
    return {
        date: entry.date.substring(0, 10),
        content: entry.content,
        keyEvent: entry.keyword,
        mood: entry.mood,
        remarks: entry.remarks,
    };
}