<script lang="ts">
    import Calendar from "$lib/components/ui/calendar/calendar.svelte";
    import EntryCard from "$lib/EntryCard.svelte";
    import * as Card from "$lib/components/ui/card";
    import { getEntriesManagerContext } from "$lib/states/entries.svelte";
    import { getAppStateContext } from "$lib/states/global.svelte";
    import { formatDate, iterateDates } from "$lib/utilities/dateUtilities";
    import { CalendarDate, type DateValue } from "@internationalized/date";

    // Context
    const appState = getAppStateContext();
    const entriesManager = getEntriesManagerContext();

    const today = new Date();

    // Define the state
    // The focused date is the current selected date in the mini-calendar
    // It defaults to the app-wide selected date
    // Note that it uses the CalendarDate type from the @internationalized/date package
    let focusedDate = $state(
        new CalendarDate(
            appState.selectedDate.getFullYear(),
            appState.selectedDate.getMonth() + 1,
            appState.selectedDate.getDate(),
        ),
    );
    let dates = $derived(getDatesToDisplay(focusedDate));

    // Fetch entries when the focused month or year changes
    // See the same setup in Calendar.svelte for why we use $effect
    $effect(() => {
        prefetchEntries(dates);
    });

    $effect(() => {
        // Trigger scroll after the date DOM blocks has been rendered
        dates;

        // This is more or less a hack to make sure the scroll happens
        // after the entry has been loaded, since I can't be bothered
        // to create a whole event system for this
        // Delay scrolling by 300 ms
        setTimeout(() => {
            scrollToSelectedDate(focusedDate);
        }, 300);
    });

    function getDatesToDisplay(focusedDate: CalendarDate) {
        let dates = iterateDates(
            new Date(focusedDate.year, focusedDate.month - 1, 1),
            new Date(focusedDate.year, focusedDate.month, 0),
        )
            .filter((x) => x <= today)
            .reverse();
        return dates;
    }

    async function prefetchEntries(dates: Date[]) {
        await entriesManager.getEntries(dates[dates.length - 1], dates[0]);
    }

    function scrollToSelectedDate(focusedDate: DateValue | CalendarDate) {
        const date = new Date(
            focusedDate.year,
            focusedDate.month - 1,
            focusedDate.day,
        );
        const anchor = document.getElementById(
            `list-entry-${formatDate(date)}`,
        )!;
        window.scrollTo({
            top: anchor.offsetTop,
            behavior: "smooth",
        });
    }
</script>

<div
    class="container mx-auto flex flex-wrap md:flex-nowrap gap-4 items-start justify-stretch"
>
    <Calendar
        bind:value={focusedDate}
        type="single"
        maxValue={new CalendarDate(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
        )}
        class="w-full md:w-auto px-6 rounded-md border shadow-sm md:sticky md:top-6 bg-card text-card-foreground"
        captionLayout="dropdown"
    />

    <Card.Root class="rounded-md w-full p-8">
        <div class="p-0 flex flex-col gap-4 w-full">
            <!-- Loop through the dates in the month and render EntryCard components -->
            {#each dates as date}
                <EntryCard {date} id={`list-entry-${formatDate(date)}`} />
            {/each}
        </div>
    </Card.Root>
</div>
