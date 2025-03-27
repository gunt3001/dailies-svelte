import { parseDate } from '$lib/utilities/dateUtilities';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import type IEntry from '$lib/model/IEntry';
import type { IServerEntriesManager } from '$lib/services/IServerEntriesManager';
import { LEGACY_API_ENDPOINT_URL, LEGACY_API_MODE, SQLITE_DB_CONNECTION } from '$lib/Constants';
import { LegacyAPIServerEntriesManager } from '$lib/services/LegacyAPIServerEntriesManager';
import { SqliteServerEntriesManager } from '$lib/services/SqliteServerEntriesManager';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

const EntriesManager: IServerEntriesManager = LEGACY_API_MODE
    ? new LegacyAPIServerEntriesManager(LEGACY_API_ENDPOINT_URL)
    : new SqliteServerEntriesManager(SQLITE_DB_CONNECTION);

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

        let newEntry = await EntriesManager.createOrUpdateEntry(entry);

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
