<script lang="ts">
    import {
        formatDate,
        getDayDifferenceText,
    } from "./utilities/dateUtilities";
    import type IEntry from "./model/IEntry";
    import { getEntriesManagerContext } from "./states/entries.svelte";
    import * as Card from "$lib/components/ui/card";

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
</script>

<td
    class:text-muted-foreground={!isCurrentMonth}
    class="p-2 text-xs sm:text-sm cursor-pointer rounded-sm bg-card text-card-foreground border shadow-sm align-top hover:bg-accent"
>
    <div>
        <span class="font-semibold text-sm">{day.getDate()}</span>
        <span class="text-xs float-right"
            >{getDayDifferenceText(day, new Date())}</span
        >
    </div>
    <p class="mt-2">
        <span class="font-semibold text-sm">{header}</span>
    </p>
    <p class="min-h-32">
        <span class="text-xs max-sm:hidden">{content}</span>
    </p>
</td>
