<script lang="ts">
    import { faCampground } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "$lib/Badge.svelte";
    import { SeriesUtilities } from "$lib/utilities/seriesUtilities";
    import type IEntry from "$lib/model/IEntry";

    interface Props {
        entry: IEntry;
        yearDifference?: number;
        dayDifference?: number;
    }

    let { entry, yearDifference, dayDifference }: Props = $props();

    // Derived states for series detection
    let series = $derived(entry.content ? SeriesUtilities.getSeries(entry.content) : null);
    let displayContent = $derived(entry.content ? SeriesUtilities.removeSeriesFromContent(entry.content) : entry.content);
    
    // Format date display
    let entryDate = $derived(new Date(entry.date));
    let dateDisplay = $derived(entryDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    }));
</script>

<div class="mb-4 p-3 border rounded-sm bg-card">
    <div class="text-sm text-muted-foreground mb-1">
        {dateDisplay}
        {#if yearDifference}
            • {yearDifference} year{yearDifference > 1 ? 's' : ''} ago
        {/if}
        {#if dayDifference}
            • {dayDifference} day{dayDifference > 1 ? 's' : ''} ago
        {/if}
    </div>
    
    {#if entry.keyEvent}
        <div class="font-semibold text-sm mb-1">{entry.keyEvent}</div>
    {/if}
    
    {#if entry.mood}
        <div class="text-sm font-medium mb-1">{entry.mood}</div>
    {/if}
    
    <div class="mb-2">
        {#if series}
            <Badge
                icon={faCampground}
                roundStyle={true}
                colorStyle={ColorStyles.Blue}>{series}</Badge>
        {/if}
    </div>
    
    {#if displayContent}
        <div class="text-sm line-clamp-3">{displayContent}</div>
    {/if}
    
    {#if entry.remarks}
        <div class="text-xs text-muted-foreground mt-2 line-clamp-2">{entry.remarks}</div>
    {/if}
</div>