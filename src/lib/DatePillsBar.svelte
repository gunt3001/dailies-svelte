<script lang="ts">
    import DatePill from "./DatePill.svelte";
    import { entries } from "./stores/entries";
    import {
        mainEditorHasUnsavedChanges,
        selectedDate,
    } from "./stores/generic";
    import { browserConfirm } from "./utilities/confirm";
    import { formatDate, isSameDate } from "./utilities/dateUtilities";

    let containerWidth: number | null = null;
    const pillWidth = 56;
    const gapWidth = 12;
    let pillsToCreate = 0;
    let today = new Date();

    $: pillsToCreate = calculateNumPills(containerWidth);
    $: dates = getDatesToDisplay(pillsToCreate);

    function calculateNumPills(containerWidth: number | null): number {
        if (containerWidth) {
            return Math.floor(containerWidth / (pillWidth + gapWidth));
        }

        return 0;
    }

    function getDatesToDisplay(count: number): Date[] {
        let dates = [];

        dates.push(today);
        for (let i = 1; i < count; i++) {
            let date = new Date(today);
            date.setDate(date.getDate() - i);
            dates.push(date);
        }

        return dates;
    }

    function onNavigate(newDate: Date) {
        // If there are unsaved changes in the editor, ask for confirmation
        if (!$mainEditorHasUnsavedChanges || browserConfirm()) {
            selectedDate.update(() => newDate);
        }
    }

    async function prefetchEntries(dates: Date[]) {
        // Given dates are assumed to be in reverse chronological order
        // Only fetch when length is 2 or more to avoid double fetching
        // at first load
        if (dates.length > 1) {
            await entries.getEntries(dates[dates.length - 1], dates[0]);
        }
    }
</script>

<div
    class="inset-0 flex gap-x-3 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:dark:to-gray-900 before:from-70% before:to-95% before:pointer-events-none"
    bind:clientWidth={containerWidth}
>
    {#await prefetchEntries(dates)}
        <!-- Dummy block for prefetching entries -->
    {/await}
    {#if pillsToCreate > 0}
        {#each dates as x, i}
            <DatePill
                date={x}
                isActive={isSameDate(x, $selectedDate)}
                isIncomplete={$entries[formatDate(x)] === null}
                on:click={() => onNavigate(x)}
            />
        {/each}
    {/if}
</div>
