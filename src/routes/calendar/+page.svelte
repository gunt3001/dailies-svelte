<script lang="ts">
    import Calendar from "$lib/Calendar.svelte";
    import CalendarHeader from "$lib/CalendarHeader.svelte";
    import { appState } from "$lib/states/global.svelte";

    // Default calendar month to current app-wide date
    // Note tht if the month is changed, it is not reflected back to the app-wide date
    let calendarMonth = $state(appState.selectedDate.getMonth());
    let calendarYear = $state(appState.selectedDate.getFullYear());

</script>

<div class="grid w-full">
    <div
        class="col md:px-8 py-8 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <CalendarHeader bind:month={calendarMonth} bind:year={calendarYear}/>
        <Calendar month={calendarMonth} year={calendarYear} />
    </div>
</div>
