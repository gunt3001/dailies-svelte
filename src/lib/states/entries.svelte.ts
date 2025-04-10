import { NEARBY_ENTRIES_TO_PREFETCH } from "$lib/Constants";
import type IEntries from "$lib/model/IEntries";
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
            // For user experience, let's pre-fetch entries close to the date requested too
            const startDate = new Date(date.getFullYear(),
                date.getMonth(), date.getDate() - NEARBY_ENTRIES_TO_PREFETCH);
            const endDate = new Date(date.getFullYear(),
                date.getMonth(), date.getDate() + NEARBY_ENTRIES_TO_PREFETCH);
            const newEntries = await this.fetchEntries(startDate, endDate);

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

            // Update values into state
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
     * Fetches an entry for a given date from the server.
     *
     * @param date - The date for which to fetch the entry.
     * @returns A promise that resolves to an IEntries object containing a single entry for the given date.
     */
    private async fetchEntry(date: Date): Promise<IEntries> {
        const response = await fetch("/api/entry/" + formatDate(date));
        if (!response.ok) {
            throw new Error("Failed to fetch entry");
        }
        const entry: IEntry = await response.json();
        return {
            [formatDate(date)]: entry,
        };
    }

    /**
     * Fetches entries from the backend within the specified date range.
     * 
     * @param from - The start date of the range.
     * @param to - The end date of the range.
     * @returns A promise that resolves to an object containing the entries.
     * 
     * The returned object has dates as keys and entries as values. If an entry is not found,
     * the value is set to null.
     */
    private async fetchEntries(from: Date, to: Date): Promise<IEntries> {
        const response = await fetch(`/api/entries?startDate=${formatDate(from)}&endDate=${formatDate(to)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch entries");
        }
        return await response.json();
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