<script lang="ts">
    import { formatDate } from "./utilities/dateUtilities";
    import { entries } from "./stores/entries";
    import type IEntry from "./model/IEntry";

    export let day: Date;
    export let isCurrentMonth: boolean;

    let today = new Date();

    let header = "";
    // Current entry
    // null means empty entry. undefined means loading.
    let activeEntry: IEntry | null | undefined = null;
    $: activeEntry = $entries[formatDate(day)];

    $: header =
        activeEntry === undefined ? "Loading..." : activeEntry?.keyEvent ?? "";
    let content = "";
    $: content = 
        activeEntry === undefined ? "Loading..." : activeEntry?.content ?? "";

    function getDayDifferenceText(date: Date, inReferenceTo: Date): string {
        // Remove both time components
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        inReferenceTo = new Date(
            inReferenceTo.getFullYear(),
            inReferenceTo.getMonth(),
            inReferenceTo.getDate(),
        );

        // Calculate the time difference in milliseconds
        const timeDifference = date.getTime() - inReferenceTo.getTime();

        // Convert milliseconds to days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (daysDifference < -1) {
            return (
                (Math.round(daysDifference) * -1).toLocaleString() + " days ago"
            );
        } else if (daysDifference == -1) {
            return "Yesterday";
        } else if (daysDifference == 1) {
            return "Tomorrow";
        } else if (daysDifference >= 1) {
            return (
                "in " + Math.round(daysDifference).toLocaleString() + " days"
            );
        } else {
            return "Today";
        }
    }
</script>

<td
    class:text-gray-500={!isCurrentMonth}
    class="p-2 h-32 align-top text-xs sm:text-sm rounded-md border hover:shadow hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 cursor-pointer"
>
    <div>
        <span class="font-semibold text-sm">{day.getDate()}</span>
        <span class="text-xs float-right"
            >{getDayDifferenceText(day, today)}</span
        >
    </div>
    <p class="mt-2">
        <span class="font-semibold text-sm">{header}</span>
    </p>
    <p>
        <span class="text-xs max-sm:hidden">{content}</span>
    </p>
</td>
