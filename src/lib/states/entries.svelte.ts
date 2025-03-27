import { API_ENDPOINT_URL, LEGACY_API_ENDPOINT_URL, LEGACY_API_MODE, NEARBY_ENTRIES_TO_PREFETCH } from "$lib/Constants";
import type IEntries from "$lib/model/IEntries";
import type { ILegacyEntry } from "$lib/model/IEntry";
import type IEntry from "$lib/model/IEntry";
import { formatDate, iterateDates, iterateMonths } from "$lib/utilities/dateUtilities";
import { getContext, setContext } from "svelte";

/**
 * Manages client-side entries state by providing methods to fetch and store entries.
 * 
 * The entries are stored in a dictionary/object, keyed by date in "YYYY-MM-DD" format.
 * If an entry is not found in the store, it will be fetched from the backend.
 * 
 */
export class ClientEntriesManager {

    // State for storing entries
    // This is a dictionary/object of entries, keyed by date in "YYYY-MM-DD" format
    private entries = $state<IEntries>({});

    /**
     * Retrieves locally cached entries without fetching from the backend.
     * 
     * @returns {IEntries} - The entries stored in the local store.
     */
    get cachedEntries() {
        return this.entries;
    }

    /**
     * Retrieves an entry for a given date. If the entry is not found in the local store,
     * it attempts to fetch the entry from the backend and updates the store accordingly.
     *
     * @param date - The date for which to retrieve the entry.
     * @returns A promise that resolves to the entry for the given date, or null if not found.
     */
    async getEntry(date: Date): Promise<IEntry | null> {
        // Convert date to "YYYY-MM-DD" format in local timezone
        const dateStr = formatDate(date);

        // Try fetch entry from the backend if not found in the store
        if (!(dateStr in this.entries)) {
            const newEntries = await this.fetchEntry(date);

            // Update values into store
            for (const [key, value] of Object.entries(newEntries)) {
                this.entries[key] = value;
            }

        };

        // Re-get value from store then try to find entry again
        if (dateStr in this.entries) {
            return this.entries[dateStr];
        }
        return null;
    }

    /**
     * Fetches entries within the specified date range and updates the store with any new entries.
     * 
     * @param from - The start date of the range.
     * @param to - The end date of the range.
     * @returns A promise that resolves to an object containing the entries within the specified date range.
     * 
     * The function performs the following steps:
     * 1. Determines the range of dates that need to be fetched by checking which dates are not yet cached in the store.
     * 2. Fetches the entries for the uncached date range.
     * 3. Updates the store with the newly fetched entries.
     * 4. Returns the entries from the updated store for the specified date range.
     */
    async getEntries(from: Date, to: Date): Promise<IEntries> {
        // From the given date range, try to fetch the smallest range of entries
        // that is not yet cached in the store
        let datesToFetch = iterateDates(from, to);
        const firstIndexWithoutCache = datesToFetch
            .findIndex(x => !(formatDate(x) in this.entries));
        const lastIndexWithoutCache = datesToFetch
            .findLastIndex(x => !(formatDate(x) in this.entries));
        if (firstIndexWithoutCache != -1 && lastIndexWithoutCache != -1) {
            const firstDateToFetch = datesToFetch[firstIndexWithoutCache];
            const lastDateToFetch = datesToFetch[lastIndexWithoutCache];
            const newEntries = await this.fetchEntries(firstDateToFetch, lastDateToFetch);

            // Update values into store
            for (const [key, value] of Object.entries(newEntries)) {
                this.entries[key] = value;
            }
        }

        // Return values from the updated store
        let returnEntries = {} as IEntries;
        for (let date of iterateDates(from, to).map(formatDate)) {
            returnEntries[date] = this.entries[date];
        }

        return returnEntries;
    }

    // Private helper functions

    /**
     * Fetches entries for a given date. Depending on the API mode, it either fetches
     * entries for the entire month (legacy mode) or fetches entries for a range of dates
     * around the given date (modern mode).
     *
     * @param date - The date for which to fetch the entry.
     * @returns A promise that resolves to an IEntries object containing a single entry for the given date.
     */
    private async fetchEntry(date: Date): Promise<IEntries> {
        // TODO: Update this to use one of the IServerEntriesManager implementations.
        // instead of fetching directly from the browser.
        if (LEGACY_API_MODE) {
            // In legacy API mode, fetching a single entry already fetches entries
            // for the entire month
            return this.fetchEntries(date, date);
        }
        else {
            // Modern API should support pulling entries for specific dates
            // For user experience, let's pre-fetch entries close to the date requested too
            const startDate = new Date(date.getFullYear(),
                date.getMonth(), date.getDate() - NEARBY_ENTRIES_TO_PREFETCH);
            const endDate = new Date(date.getFullYear(),
                date.getMonth(), date.getDate() + NEARBY_ENTRIES_TO_PREFETCH);
            return this.fetchEntries(startDate, endDate);
        }
    }

    /**
     * Fetches entries from the backend within the specified date range.
     * 
     * Depending on the API mode, it either fetches entries month-by-month (legacy mode)
     * or for the entire date range (modern mode).
     * 
     * @param from - The start date of the range.
     * @param to - The end date of the range.
     * @returns A promise that resolves to an object containing the entries.
     * 
     * The returned object has dates as keys and entries as values. If an entry is not found,
     * the value is set to null.
     */
    private async fetchEntries(from: Date, to: Date): Promise<IEntries> {
        // TODO: Update this to use one of the IServerEntriesManager implementations.
        // instead of fetching directly from the browser.

        // Fetch multiple entries from the backend
        const newEntries: IEntries = {};

        if (LEGACY_API_MODE) {
            // Legacy API only support pulling entries on a month-by-month basis
            // Fetch entries for all months in the range

            // Create an array of year and month pairs
            let monthsToFetch = iterateMonths(from, to);

            // Fetch entries for each month
            for (const { year, month } of monthsToFetch) {
                const response = await fetch(`${LEGACY_API_ENDPOINT_URL}/Entries?year=${year}&month=${month}`);
                const entries: ILegacyEntry[] = await response.json();

                // Loop through every day of the requested month
                // If the entry is not found, set it to null
                // Otherwise, convert the entry to the new format
                let date = new Date(year, month - 1, 1);
                while (date.getMonth() === month - 1) {
                    const dateStr = formatDate(date);
                    const existingEntry = entries.find((entry) => entry.date.startsWith(dateStr));
                    newEntries[dateStr] = existingEntry ? this.convertToNewFormat(existingEntry) : null;
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

            // Loop through missing entries returned from API
            // Fill them with nulls to signify entries yet to be created
            for (let date of iterateDates(from, to)) {
                let formattedDate = formatDate(date);
                if (!(formattedDate in newEntries)) {
                    newEntries[formattedDate] = null;
                }
            }
        }

        return newEntries;
    }

    /**
     * Converts a legacy entry to the new format.
     *
     * @param entry - The legacy entry to be converted.
     * @returns The entry in the new format.
     */
    private convertToNewFormat(entry: ILegacyEntry): IEntry {
        return {
            date: entry.date.substring(0, 10),
            content: entry.content,
            keyEvent: entry.keyword,
            mood: entry.mood,
            remarks: entry.remarks,
        };
    }

}

// Convenience functions for setting and getting the EntriesManager context
const ENTRIES_MANAGER_CONTEXT_KEY = Symbol("EntriesManager");
export function createAndSetEntriesManagerContext() {
    return setContext(ENTRIES_MANAGER_CONTEXT_KEY, new ClientEntriesManager());
}
export function getEntriesManagerContext() {
    return getContext<ReturnType<typeof createAndSetEntriesManagerContext>>(ENTRIES_MANAGER_CONTEXT_KEY);
}