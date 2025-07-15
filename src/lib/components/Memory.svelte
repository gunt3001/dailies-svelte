<script lang="ts">
    import type IEntry from "$lib/model/IEntry";
    import EntryCardNarrow from "./EntryCardNarrow.svelte";

    interface Props {
        memoryEntries: IEntry[];
        randomEntry: IEntry | null;
    }

    let { memoryEntries, randomEntry }: Props = $props();

    // Calculate years ago for memory entries
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    // Calculate days ago for random entry
    function getDaysAgo(entryDate: string): number {
        const entry = new Date(entryDate);
        const today = new Date();
        const diffTime = today.getTime() - entry.getTime();
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    function getYearsAgo(entryDate: string): number {
        const entry = new Date(entryDate);
        return currentYear - entry.getFullYear();
    }
</script>

<div>
    {#if memoryEntries.length > 0}
        <h1 class="font-semibold text-xl mb-4">On this day...</h1>
        
        {#each memoryEntries as entry}
            {@const yearsAgo = getYearsAgo(entry.date)}
            {#if yearsAgo > 0}
                <EntryCardNarrow {entry} yearDifference={yearsAgo} />
            {/if}
        {/each}
    {/if}
    
    {#if randomEntry}
        {@const daysAgo = getDaysAgo(randomEntry.date)}
        <h1 class="font-semibold text-xl mb-2">And also...</h1>
        <EntryCardNarrow entry={randomEntry} dayDifference={daysAgo} />
    {/if}
    
    {#if memoryEntries.length === 0 && !randomEntry}
        <div class="text-muted-foreground text-sm">
            No memory entries available yet. Start journaling to create some memories!
        </div>
    {/if}
</div>