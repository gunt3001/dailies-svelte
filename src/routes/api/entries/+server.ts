import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { formatDate, iterateDates, parseDate } from '$lib/utilities/dateUtilities';
import type IEntry from '$lib/model/IEntry';

export async function GET(param: RequestEvent) {

    const { url } = param;

    const fromDate = parseDate(url.searchParams.get("from")!);
    const toDate = parseDate(url.searchParams.get("to")!);

    const returnVal = iterateDates(fromDate, toDate)
        // Except every days divisble by 5
        .filter(x => x.getDate() % 5 != 0)
        .map(date => {
            const formattedDate = formatDate(date);
            let entry = {
                date: formattedDate,
                content: "Test content on " + formattedDate,
                keyEvent: "Some key event",
                mood: "Relaxed",
                remarks: "",
            } as IEntry;
            return entry;
        });
    return json(returnVal);
}