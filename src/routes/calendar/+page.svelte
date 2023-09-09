<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faChevronLeft,
        faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";

    const date = new Date();
    // First get day of month
    let dayToDisplay = new Date(date.getFullYear(), date.getMonth(), 1);
    // We display up to 6 days of previous month
    // depending on which day of week first day of this month is
    dayToDisplay.setDate(dayToDisplay.getDate() - dayToDisplay.getDay());
    let daysToDisplay: Array<Array<Date>> = [];
    while (
        dayToDisplay.getFullYear() < date.getFullYear() ||
        (dayToDisplay.getFullYear() === date.getFullYear() &&
            dayToDisplay.getMonth() <= date.getMonth())
    ) {
        let week: Array<Date> = [];
        for (let i = 0; i < 7; i++) {
            week.push(new Date(dayToDisplay));
            dayToDisplay.setDate(dayToDisplay.getDate() + 1);
        }
        daysToDisplay.push(week);
    }
</script>

<div class="container mx-auto grid">
    <div
        class="col md:px-8 py-8 drop-shadow bg-white rounded border dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <div class="flex flex-row">
            <button type="button" class="flex-none text-xl px-8">
                <Fa icon={faChevronLeft} />
            </button>
            <div class="text-center flex-1">
                <h1 class="text-3xl font-medium">September</h1>
                <select class="rounded dark:bg-gray-900 px-4 py-2">
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option selected>2023</option>
                </select>
            </div>
            <button type="button" class="flex-none text-xl px-8">
                <Fa icon={faChevronRight} />
            </button>
        </div>
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

            {#each daysToDisplay as week}
                <tr>
                    {#each week as day}
                        <td
                            class="p-2 h-32 text-xs sm:text-sm rounded-md border hover:shadow hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 cursor-pointer"
                            >{day.getDate()}</td
                        >
                    {/each}
                </tr>
            {/each}
        </table>
    </div>
</div>
