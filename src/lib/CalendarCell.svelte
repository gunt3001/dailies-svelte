<script lang="ts">
    import {
        formatDate,
        getDayDifferenceText,
    } from "./utilities/dateUtilities";
    import type IEntry from "./model/IEntry";
    import { getEntriesManagerContext } from "./states/entries.svelte";
    import { faCampground } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
    import { SeriesUtilities } from "./utilities/seriesUtilities";

    interface Props {
        day: Date; // The date for this cell
        isCurrentMonth: boolean; // Whether the date is part of the selected month in Calendar view
    }

    let { day, isCurrentMonth }: Props = $props();

    // Context
    const entriesManager = getEntriesManagerContext();

    // State variables

    // Current entry
    // null means empty entry. undefined means loading.
    let activeEntry: IEntry | null | undefined = $derived(
        entriesManager.cachedEntries[formatDate(day)],
    );

    // Entry details
    let header = $derived(
        activeEntry === undefined
            ? "Loading..."
            : (activeEntry?.keyEvent ?? ""),
    );
    let content = $derived(
        activeEntry === undefined ? "Loading..." : (activeEntry?.content ?? ""),
    );
    let mood = $derived(
        activeEntry === undefined ? "" : (activeEntry?.mood ?? ""),
    );

    // Series detection
    let series = $derived(
        activeEntry && activeEntry.content
            ? SeriesUtilities.getSeries(activeEntry.content)
            : null,
    );
    let displayContent = $derived(
        activeEntry && activeEntry.content
            ? SeriesUtilities.removeSeriesFromContent(activeEntry.content)
            : content,
    );
</script>

<td
    class:text-muted-foreground={!isCurrentMonth}
    class="p-2 text-xs sm:text-sm cursor-pointer rounded-sm bg-card text-card-foreground border shadow-sm align-top hover:bg-accent"
>
    <div>
        <span class="font-semibold text-sm">{day.getDate()}</span>
    </div>
    <div class="text-muted-foreground">
        <span class="text-xs">{mood}</span>
        <span class="text-xs float-right"
            >{getDayDifferenceText(day, new Date())}</span
        >
    </div>
    <div class="mt-2">
        {#if series}
            <div class="my-1" title={series}>
                <Badge
                    icon={faCampground}
                    roundStyle={true}
                    colorStyle={ColorStyles.Blue}
                >
                    <span class="truncate">{series}</span>
                </Badge>
            </div>
        {/if}
        <span class="font-semibold text-sm">{header}</span>
    </div>
    <div class="min-h-24">
        <span class="text-xs max-sm:hidden">{displayContent}</span>
    </div>
</td>
