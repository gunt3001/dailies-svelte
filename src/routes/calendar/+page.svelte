<script lang="ts">
    import Calendar from "$lib/Calendar.svelte";
    import CalendarHeader from "$lib/CalendarHeader.svelte";
    import { selectedDate } from "$lib/stores/generic";
</script>

<div class="grid w-full">
    <div
        class="col md:px-8 py-8 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <CalendarHeader />
        <Calendar month={$selectedDate.getMonth()} year={$selectedDate.getFullYear()} />
    </div>
</div>
