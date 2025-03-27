import type IEntry from "$lib/model/IEntry";

/**
 * Manages entries on the server.
 * This class provides methods to retrieve, create, and update entries on the server.
 */
export interface IServerEntriesManager {
    /**
     * Retrieves an entry at the specified date from the server.
     * @param date - The date of the entry to retrieve.
     * @returns A promise that resolves to the entry, or null if not found.
     */
    fetchEntry(date: Date): Promise<IEntry | null>;

    /**
     * Retrieves entries for the specified date range.
     * @param startDate - The start date of the range (inclusive).
     * @param endDate - The end date of the range (inclusive).
     * @returns A promise that resolves to an array of entries.
     */
    fetchEntries(startDate: Date, endDate: Date): Promise<IEntry[]>;

    /**
     * Creates or update an entry on the server.
     * @param entry - The entry to create.
     * @returns A promise that resolves to the created entry.
     */
    createOrUpdateEntry(entry: IEntry): Promise<IEntry>;
}

