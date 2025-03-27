import { ServerEntriesManager } from "$lib/services/IServerEntriesManager";
import { parseDate } from "$lib/utilities/dateUtilities";
import { json, type RequestEvent } from "@sveltejs/kit";

/**
 * API Endpoint for fetching a single entry
 */
export async function GET(param: RequestEvent) {

    const date = param.params.date;
    if (!date) {
        return new Response("Date not provided", { status: 400 });
    }

    const entry = await ServerEntriesManager.fetchEntry(parseDate(date));
    if (!entry) {
        return new Response("Entry not found", { status: 404 });
    }

    return json(entry);
}