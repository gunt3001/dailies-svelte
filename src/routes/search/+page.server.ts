import { ServerEntriesManager } from "$lib/services/IServerEntriesManager";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const query = url.searchParams.get('q') || '';
    
    if (!query.trim()) {
        return {
            query,
            entries: {}
        };
    }

    try {
        const entries = await ServerEntriesManager.searchEntries(query);
        return {
            query,
            entries
        };
    } catch (error) {
        console.error('Search failed:', error);
        return {
            query,
            entries: {},
            error: 'Search failed. Please try again.'
        };
    }
};