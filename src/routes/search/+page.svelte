<script lang="ts">
    import EntryCardRaw from "$lib/EntryCardRaw.svelte";
    import { formatDate, getDayDifferenceText, parseDate } from "$lib/utilities/dateUtilities";
    import { toLongDate } from "$lib/utilities/dateFormatter";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const today = new Date();
    const entriesList = Object.entries(data.entries).map(([dateStr, entry]) => ({
        date: parseDate(dateStr),
        dateStr,
        entry
    })).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date descending
</script>

<div class="container mx-auto px-4 py-6">
    <div class="mb-6">
        <h1 class="text-2xl font-bold mb-2">Search Results</h1>
        {#if data.query}
            <p class="text-muted-foreground">
                Results for: <strong>"{data.query}"</strong>
            </p>
            <p class="text-sm text-muted-foreground mt-1">
                Found {entriesList.length} {entriesList.length === 1 ? 'entry' : 'entries'}
            </p>
        {:else}
            <p class="text-muted-foreground">
                Enter a search query to find entries.
            </p>
        {/if}
    </div>

    {#if data.error}
        <div class="p-4 mb-6 bg-red-50 border border-red-200 rounded-md">
            <p class="text-red-700">{data.error}</p>
        </div>
    {/if}

    {#if data.query && entriesList.length === 0 && !data.error}
        <div class="p-8 text-center text-muted-foreground">
            <p>No entries found matching your search.</p>
            <p class="text-sm mt-2">Try different keywords or check your spelling.</p>
        </div>
    {:else if entriesList.length > 0}
        <div class="flex flex-col gap-4">
            {#each entriesList as { date, dateStr, entry }}
                <EntryCardRaw 
                    {date}
                    id={`search-entry-${dateStr}`}
                    dateText={toLongDate(date)}
                    dayDifferenceText={getDayDifferenceText(date, today)}
                    mood={entry?.mood}
                    keyEvent={entry?.keyEvent}
                    content={entry?.content}
                    remarks={entry?.remarks}
                    isLoading={false}
                    isEmpty={!entry}
                />
            {/each}
        </div>
    {/if}
</div>