<script lang="ts">
    import type IEntry from "./model/IEntry";
    import * as Card from "$lib/components/ui/card";
    import { formatDate, getDayDifferenceText, parseDate } from "./utilities/dateUtilities";
    import { toLongDate } from "./utilities/dateFormatter";
    import { getEntriesManagerContext } from "./states/entries.svelte";

    interface Props {
        date: Date;
    }

    let { date }: Props = $props();

    // Current entry
    // null means empty entry. undefined means loading.
    const entriesManager = getEntriesManagerContext();
    let entry: IEntry | null | undefined = $derived(entriesManager.cachedEntries[formatDate(date)]);
</script>

<Card.Root class="rounded-md">
    <div class="flex flex-row px-6 gap-8">
        <div class="whitespace-normal lg:whitespace-nowrap min-w-32 lg:min-w-64">
            <div class="font-semibold">
                {toLongDate(date)}
            </div>
            <div class="text-muted-foreground text-sm">
                {getDayDifferenceText(date, new Date())}
            </div>
            <div class="mt-4 text-sm font-semibold">
                {entry?.mood}
            </div>
        </div>
        {#if entry}
            <div>
                <div class="font-semibold">{entry.keyEvent}</div>
                {entry.content}
                <div class="mt-4 text-muted-foreground whitespace-pre-wrap">
                    {entry.remarks}
                </div>
            </div>
        {:else if entry === undefined}
            <div>
                <em>Loading...</em>
            </div>
        {:else}
            <div>
                <em> No entry </em>
            </div>
        {/if}
    </div>
</Card.Root>
