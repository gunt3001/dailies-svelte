<script lang="ts">
    import Editor from "./Editor.svelte";
    import EditorModal from "./EditorModal.svelte";

    export let month: number;
    export let year: number;
    const today = new Date();

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

    function getDayDifferenceText(date: Date, inReferenceTo: Date): string {
        // Remove both time components
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        inReferenceTo = new Date(
            inReferenceTo.getFullYear(),
            inReferenceTo.getMonth(),
            inReferenceTo.getDate()
        );

        // Calculate the time difference in milliseconds
        const timeDifference = date.getTime() - inReferenceTo.getTime();

        // Convert milliseconds to days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (daysDifference < -1) {
            return (Math.round(daysDifference) * -1).toLocaleString() + " days ago";
        } else if (daysDifference == -1) {
            return "Yesterday";
        } else if (daysDifference == 1) {
            return "Tomorrow";
        } else if (daysDifference >= 1) {
            return "in " + Math.round(daysDifference).toLocaleString() + " days";
        } else {
            return "Today";
        }
    }

    let calendarCells: Date[][] = [];
    $: calendarCells = buildCalendarCells(month, year);

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
                <td
                    class:text-gray-500={day.getMonth() != month ||
                        day.getFullYear() != year}
                    class="p-2 h-32 align-top text-xs sm:text-sm rounded-md border hover:shadow hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 cursor-pointer"
                    on:click={() => editorDate = "testDate"}
                >
                    <div>
                        <span class="font-semibold text-sm"
                            >{day.getDate()}</span
                        >
                        <span class="text-xs float-right"
                            >{getDayDifferenceText(day, today)}</span
                        >
                    </div>
                    <p class="mt-2">
                        <span class="font-semibold text-sm">Test Header</span>
                    </p>
                    <p>
                        <span class="text-xs max-sm:hidden"
                            >Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.</span
                        >
                    </p>
                </td>
            {/each}
        </tr>
    {/each}
</table>

<EditorModal editorDate={editorDate} on:close={() => editorDate = null} />