import { parseDate } from '$lib/utilities/dateUtilities';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

// Actions for form submissions
export const actions = {
    // POST action for creating or updating an entry
    updateEntry: async (event: RequestEvent) => {
        let data = await event.request.formData();
        console.log(data);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Redirect to calendar page at specified month and year
        const date = data.get('date') as string;
        const parsedDate = parseDate(date);
        const year = parsedDate.getFullYear();
        const month = parsedDate.getMonth() + 1;
        return redirect(303, `/calendar?year=${year}&month=${month}`);
    }
} satisfies Actions;
