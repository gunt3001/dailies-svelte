<script lang="ts">
    import CalendarCell from "./CalendarCell.svelte";
    import EditorModal from "./EditorModal.svelte";
    import { entries } from "./stores/entries";

    export let month: number;
    export let year: number;

    function buildCalendarCells(month: number, year: number): Date[][] {
        // First get day of month
        let dayToDisplay = new Date(year, month, 1);
        // We display up to 6 days of previous month
        // depending on which day of week first day of this month is
        dayToDisplay.setDate(dayToDisplay.getDate() - dayToDisplay.getDay());
        let daysToDisplay: Array<Array<Date>> = [];
        while (
            dayToDisplay.getFullYear() < year ||
            (dayToDisplay.getFullYear() === year &&
                dayToDisplay.getMonth() <= month)
        ) {
            let week: Array<Date> = [];
            for (let i = 0; i < 7; i++) {
                week.push(new Date(dayToDisplay));
                dayToDisplay.setDate(dayToDisplay.getDate() + 1);
            }
            daysToDisplay.push(week);
        }

        return daysToDisplay;
    }

    let calendarCells: Date[][] = [];
    $: calendarCells = buildCalendarCells(month, year);

    // Fetch entries as month & year change
    async function updateCalendarCells(calendarCells: Date[][]) {
        await entries.getEntries(
            calendarCells[0][0],
            calendarCells[calendarCells.length - 1][6],
        );
    }
    $: updateCalendarCells(calendarCells);

    let editorDate: string | null = null;
</script>

<table class="table-fixed w-full mt-6 border-separate border-spacing-2">
    <tr>
        <th class="py-2 text-red-500">
            <span class="inline sm:hidden">S</span>
            <span class="hidden sm:inline">Sunday</span>
        </th>
        <th class="py-2">
            <span class="inline sm:hidden">M</span>
            <span class="hidden sm:inline">Monday</span>
        </th>
        <th class="py-2">
            <span class="inline sm:hidden">T</span>
            <span class="hidden sm:inline">Tuesday</span>
        </th>
        <th class="py-2">
            <span class="inline sm:hidden">W</span>
            <span class="hidden sm:inline">Wednesday</span>
        </th>
        <th class="py-2">
            <span class="inline sm:hidden">T</span>
            <span class="hidden sm:inline">Thursday</span>
        </th>
        <th class="py-2">
            <span class="inline sm:hidden">F</span>
            <span class="hidden sm:inline">Friday</span>
        </th>
        <th class="py-2 text-blue-500">
            <span class="inline sm:hidden">S</span>
            <span class="hidden sm:inline">Saturday</span>
        </th>
    </tr>

    {#each calendarCells as week}
        <tr>
            {#each week as day}
                <CalendarCell
                    {day}
                    isCurrentMonth={day.getMonth() == month &&
                        day.getFullYear() == year}
                />
            {/each}
        </tr>
    {/each}
</table>

<EditorModal {editorDate} on:close={() => (editorDate = null)} />
