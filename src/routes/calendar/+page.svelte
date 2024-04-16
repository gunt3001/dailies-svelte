<script lang="ts">
    import Calendar from "$lib/Calendar.svelte";
    import CalendarHeader from "$lib/CalendarHeader.svelte";
    import { selectedDate } from "$lib/stores/generic";

    let calendarMonth = $selectedDate.getMonth();
    let calendarYear = $selectedDate.getFullYear();

</script>

<div class="grid w-full">
    <div
        class="col md:px-8 py-8 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <CalendarHeader bind:month={calendarMonth} bind:year={calendarYear}/>
        <Calendar month={calendarMonth} year={calendarYear} />
    </div>
</div>
