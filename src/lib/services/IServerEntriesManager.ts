import { LEGACY_API_ENDPOINT_URL, LEGACY_API_MODE, SQLITE_DB_CONNECTION } from "$lib/ServerConfig";
import type IEntries from "$lib/model/IEntries";
import type IEntry from "$lib/model/IEntry";
import { LegacyAPIServerEntriesManager } from "./LegacyAPIServerEntriesManager";
import { SqliteServerEntriesManager } from "./SqliteServerEntriesManager";

export const ServerEntriesManager: IServerEntriesManager = LEGACY_API_MODE
    ? new LegacyAPIServerEntriesManager(LEGACY_API_ENDPOINT_URL)
    : new SqliteServerEntriesManager(SQLITE_DB_CONNECTION);

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
     * @returns A promise that resolves to an object containing entries for the specified date range.
     */
    fetchEntries(startDate: Date, endDate: Date): Promise<IEntries>;

    /**
     * Creates or update an entry on the server.
     * @param entry - The entry to create.
     * @returns A promise that resolves to the created entry.
     */
    createOrUpdateEntry(entry: IEntry): Promise<IEntry>;
}

