import type IEntries from "$lib/model/IEntries";
import type { ILegacyEntry } from "$lib/model/IEntry";
import type IEntry from "$lib/model/IEntry";
import { formatDate, iterateMonths } from "$lib/utilities/dateUtilities";
import type { IServerEntriesManager } from "./IServerEntriesManager";

/**
 * An implementation of the Server Entries Manager that interacts with the
 * .NET legacy API.
 */
export class LegacyAPIServerEntriesManager implements IServerEntriesManager {
    private readonly apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async fetchEntry(date: Date): Promise<IEntry | null> {
        // In legacy API mode, fetching a single entry already fetches entries
        // for the entire month
        let entries = await this.fetchEntries(date, date);
        // Return only relevant entry
        let entry = entries[formatDate(date)];
        return entry || null;
    }

    async fetchEntries(startDate: Date, endDate: Date): Promise<IEntries> {
        const newEntries: IEntries = {};

        // Legacy API only support pulling entries on a month-by-month basis
        // Fetch entries for all months in the range

        // Create an array of year and month pairs
        let monthsToFetch = iterateMonths(startDate, endDate);

        // Fetch entries for each month
        for (const { year, month } of monthsToFetch) {
            const response = await fetch(`${this.apiUrl}/Entries?year=${year}&month=${month}`);
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
        return newEntries;
    }

    async createOrUpdateEntry(entry: IEntry): Promise<IEntry> {
        // Legacy API uses the /Entries endpoint using PUT verb
        // with the entry content in the request body in JSON format
        let legacyEntry = {
            date: entry.date, // Endpoint should be able to support YYYY-MM-DD date format
            content: entry.content,
            keyword: entry.keyEvent,
            mood: entry.mood,
            remarks: entry.remarks,
        } as ILegacyEntry;

        // One caveat of the legacy API is that this endpoint needs to know
        // whether the entry is new or an update by specifying the query
        // parameter "updateExisting" in the URL
        // We just try to submit and check for 409 - Conflict status
        let isExistingEntry = false;
        let response = await fetch(`${this.apiUrl}/Entries?updateExisting=${isExistingEntry}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(legacyEntry),
        });
        if (response.status === 409) {
            // Entry already exists, so we need to update it
            isExistingEntry = true;
            response = await fetch(`${this.apiUrl}/Entries?updateExisting=${isExistingEntry}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(legacyEntry),
            });
        }

        if (response.ok) {
            return entry;
        } else {
            // TODO: Gracefully handle error
            const errorText = await response.text();
            throw new Error(`Failed to update entry: ${errorText}`);
        }
    }

    async searchEntries(query: string): Promise<IEntries> {
        const response = await fetch(`${this.apiUrl}/Entries/search?query=${encodeURIComponent(query)}`);
        const entries: ILegacyEntry[] = await response.json();
        
        const newEntries: IEntries = {};
        for (const entry of entries) {
            const dateStr = entry.date.substring(0, 10);
            newEntries[dateStr] = this.convertToNewFormat(entry);
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

