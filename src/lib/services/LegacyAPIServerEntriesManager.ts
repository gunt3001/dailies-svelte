import type { ILegacyEntry } from "$lib/model/IEntry";
import type IEntry from "$lib/model/IEntry";
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
        // TODO: Implement the method to fetch an entry from the legacy API
        throw new Error("Method not implemented.");
    }

    async fetchEntries(startDate: Date, endDate: Date): Promise<IEntry[]> {
        // TODO: Implement the method to fetch entries from the legacy API
        throw new Error("Method not implemented.");
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
}

