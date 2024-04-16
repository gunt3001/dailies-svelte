import type IEntries from '$lib/model/IEntries';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { formatDate, isSameDate, parseDate } from '$lib/utilities/dateUtilities';
import type IEntry from '$lib/model/IEntry';

export async function GET(param: RequestEvent) {

    const { url } = param;

    const fromDate = parseDate(url.searchParams.get("from")!);
    const toDate = parseDate(url.searchParams.get("to")!);

    const returnVal: IEntry[] = [];

    // Generate dummy entries
    let date = new Date(fromDate);
    while (!isSameDate(date, toDate)) {

        const formattedDate = formatDate(date);

        let entry = {
            date: formattedDate,
            content: "Test content on " + formattedDate,
            keyEvent: "Some key event",
            mood: "Relaxed",
            remarks: "",
        } as IEntry;
        returnVal.push(entry);

        // Increment date
        date = new Date(date.getFullYear(),
            date.getMonth(), date.getDate() + 1);
    }    
    
    
    return json(returnVal);
    
}