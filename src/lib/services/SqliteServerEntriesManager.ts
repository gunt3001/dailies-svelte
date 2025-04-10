import { NEARBY_ENTRIES_TO_PREFETCH } from "$lib/Constants";
import type IEntries from "$lib/model/IEntries";
import type IEntry from "$lib/model/IEntry";
import type { IServerEntriesManager } from "./IServerEntriesManager";

/**
 * An implementation of the Server Entries Manager that connects to the Sqlite
 * database directly from SvelteKit.
 */

export class SqliteServerEntriesManager implements IServerEntriesManager {
    private readonly dbUrl: string;

    constructor(dbUrl: string) {
        this.dbUrl = dbUrl;
    }

    async fetchEntry(date: Date): Promise<IEntry | null> {
        // TODO: Implement the method to fetch entries from the Sqlite database
        throw new Error("Method not implemented.");
    }

    async fetchEntries(startDate: Date, endDate: Date): Promise<IEntries> {
        // TODO: Implement the method to fetch entries from the Sqlite database
        throw new Error("Method not implemented.");
    }

    async createOrUpdateEntry(entry: IEntry): Promise<IEntry> {
        // TODO: Implement the method to create or update an entry in the Sqlite database
        throw new Error("Method not implemented.");
    }
}
