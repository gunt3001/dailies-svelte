<script lang="ts">
    import CalendarCell from "./CalendarCell.svelte";
    import EditorModal from "./EditorModal.svelte";
    import { getEntriesManagerContext } from "./states/entries.svelte";

    interface Props {
        month: number;
        year: number;
        highlightDay?: number | null;
    }

    // Context
    const entriesManager = getEntriesManagerContext();

    // Props
    let { month, year, highlightDay }: Props = $props();

    // 2D-array to store dates to be displayed in the calendar
    let calendarCells: Date[][] = $derived(buildCalendarCells(month, year));

    // Fetch entries when the calendar is updated
    // We use $effect here as we need up update the app-wide state using a
    // network fetch request, which doesn't fit with $state or $derived mechanisms.
    $effect(() => {
        prefetchEntries(calendarCells);
    });

    // Calculate the dates to be displayed in the calendar
    // based on the month and year
    // Returns a 2D array of dates
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

    // Prefetch entires as cells are updated
    async function prefetchEntries(calendarCells: Date[][]) {
        await entriesManager.getEntries(
            calendarCells[0][0],
            calendarCells[calendarCells.length - 1][6],
        );
    }
    
    let editorDate: string | null = $state(null);
    
    function handleCellClick(date: Date) {
        const dateString = date.toISOString().split('T')[0];
        editorDate = dateString;
    }
</script>

<table class="table-fixed w-full mt-6 border-separate border-spacing-2">
    <thead>
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
    </thead>
    <tbody>
    {#each calendarCells as week}
        <tr>
            {#each week as day}
                <CalendarCell
                    {day}
                    isCurrentMonth={day.getMonth() == month &&
                        day.getFullYear() == year}
                    shouldFlash={highlightDay !== null && highlightDay !== undefined && 
                        day.getDate() === highlightDay && 
                        day.getMonth() === month && 
                        day.getFullYear() === year}
                    onCellClick={handleCellClick}
                />
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<EditorModal {editorDate} onModalDismissed={() => (editorDate = null)} />
