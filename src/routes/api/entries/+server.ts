import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { parseDate } from '$lib/utilities/dateUtilities';
import { ServerEntriesManager } from '$lib/services/IServerEntriesManager';

export async function GET(param: RequestEvent) {

    const { url } = param;
    const fromDate = parseDate(url.searchParams.get("startDate")!);
    const toDate = parseDate(url.searchParams.get("endDate")!);
    const entries = await ServerEntriesManager.fetchEntries(fromDate, toDate);

    if (!entries) {
        return error(500, "Failed to fetch entries");
    }
    return json(entries);
}