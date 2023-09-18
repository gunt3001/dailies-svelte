import type IEntries from "$lib/model/IEntries";
import type IEntry from "$lib/model/IEntry";
import { writable } from "svelte/store";

function createEntriesStore() {
    const entries: IEntries = {
        "2023-01-01": {
            date: "2023-01-01",
            content: "Test content",
            keyEvent: "Test key",
            mood: "Happy",
            remarks: "Aloha",
        },
    };
    const { subscribe, set, update } = writable(entries);

    const store = {
        subscribe,
    };

	return store;
}

export const entries = createEntriesStore();
export function getEntry(entries: IEntries, date: string): IEntry | null {
    if (date in entries) {
        return entries[date];
    }
    return null;
}
