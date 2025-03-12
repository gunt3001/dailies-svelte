<script lang="ts">
    import DatePill from "./DatePill.svelte";
    import { entries } from "./stores/entries";
    import { appState } from "./states/global.svelte";
    import { browserConfirm } from "./utilities/confirm";
    import { formatDate, isSameDate } from "./utilities/dateUtilities";
    import MorePill from "./MorePill.svelte";
    import { goto } from "$app/navigation";

    // Define pill width and gap width
    const pillWidth = 56;
    const gapWidth = 12;

    // Keep track of container width in a state
    let containerWidth: number | null = $state(null);
    let pillsToCreate = $derived(containerWidth ? Math.floor(containerWidth / (pillWidth + gapWidth)) : 0);
    let dates = $derived(getDatesToDisplay(pillsToCreate));

    function getDatesToDisplay(count: number): Date[] {
        let dates = [];

        let today = new Date();
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
        if (!appState.mainEditorHasUnsavedChanges || browserConfirm()) {
            appState.selectedDate = newDate;
        }
    }

    // Navigate to the date on the calendar view
    function onCalendarNavigate(newDate: Date) {
        // If there are unsaved changes in the editor, ask for confirmation
        if (!appState.mainEditorHasUnsavedChanges || browserConfirm()) {
            appState.selectedDate = newDate;
            goto(`/calendar`);
        }
    }

</script>

<div
    class="inset-0 flex gap-x-3 overflow-hidden"
    bind:clientWidth={containerWidth}
>
    {#if pillsToCreate > 0}
        {#each dates as x, i}
            {#if i == dates.length - 1}
                <!-- Last pill is a special pill button that goes to calendar view -->
                <MorePill
                    onClick={() => onCalendarNavigate(x)}
                />
            {:else}
                <!-- Regular date pill -->
                <DatePill
                    date={x}
                    isActive={isSameDate(x, appState.selectedDate)}
                    isIncomplete={$entries[formatDate(x)] === null}
                    onClick={() => onNavigate(x)}
                />
            {/if}
        {/each}
    {/if}
</div>
