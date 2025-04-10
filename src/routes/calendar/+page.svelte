<script lang="ts">
    import { page } from "$app/state";
    import Calendar from "$lib/Calendar.svelte";
    import CalendarHeader from "$lib/CalendarHeader.svelte";
    import { getAppStateContext } from "$lib/states/global.svelte";

    // Context
    const appState = getAppStateContext();

    // Define the default calendar month and year to display
    // Use the query parameter if it exists
    // Otherwise, use the app-wide selected date
    let defaultMonth = page.url.searchParams.get("month") ?
        parseInt(page.url.searchParams.get("month") as string) - 1 :
        appState.selectedDate.getMonth();
    let defaultYear = page.url.searchParams.get("year") ?
        parseInt(page.url.searchParams.get("year") as string) :
        appState.selectedDate.getFullYear();

    // Default calendar month to current app-wide date
    // Note that even if the month is changed, it will not reflect back to the app-wide date
    
    // Create state for displayed calendar month
    let calendarMonth = $state(defaultMonth);
    let calendarYear = $state(defaultYear);

</script>

<div class="grid w-full">
    <div
        class="col md:px-8 py-8 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <CalendarHeader bind:month={calendarMonth} bind:year={calendarYear}/>
        <Calendar month={calendarMonth} year={calendarYear} />
    </div>
</div>
