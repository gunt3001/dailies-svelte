import { parseDate } from '$lib/utilities/dateUtilities';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type IEntry from '$lib/model/IEntry';
import { ServerEntriesManager } from '$lib/services/IServerEntriesManager';

export const load = (async () => {
    try {
        const [memoryEntries, randomEntry] = await Promise.all([
            ServerEntriesManager.fetchMemoryEntries(2),
            ServerEntriesManager.fetchRandomEntry()
        ]);

        return {
            memoryEntries,
            randomEntry
        };
    } catch (error) {
        console.error('Failed to fetch memory data:', error);
        return {
            memoryEntries: [],
            randomEntry: null
        };
    }
}) satisfies PageServerLoad;

// Actions for form submissions
export const actions = {
    // POST action for creating or updating an entry
    updateEntry: async (event: RequestEvent) => {
        let data = await event.request.formData();

        // Create IEntry object from form data
        const entry: IEntry = {
            date: data.get('date') as string,
            content: data.get('content') as string,
            keyEvent: data.get('keyEvent') as string,
            mood: data.get('mood') as string,
            remarks: data.get('remarks') as string
        };

        let newEntry = await ServerEntriesManager.createOrUpdateEntry(entry);

        if (!newEntry) {
            // Handle error case
            console.error("Failed to create or update entry");
            return error(500, {
                message: "Failed to create or update entry"
            });
        }

        // Redirect to calendar page at specified month and year
        const parsedDate = parseDate(newEntry.date);
        const year = parsedDate.getFullYear();
        const month = parsedDate.getMonth() + 1;
        return redirect(303, `/calendar?year=${year}&month=${month}`);
    }
} satisfies Actions;
