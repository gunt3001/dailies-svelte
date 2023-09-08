<script lang="ts">
    import DatePill from "./DatePill.svelte";

    let containerWidth: number | null = null;
    const pillWidth = 56;
    const gapWidth = 12;
    const currentDate = new Date();
    let pillsToCreate = 0;
    let selectedDate = currentDate;

    $: pillsToCreate = calculateNumPills(containerWidth);
    $: dates = getDatesToDisplay(pillsToCreate);

    function calculateNumPills(containerWidth: number | null): number {
        if (containerWidth) {
            return Math.floor(containerWidth / (pillWidth + gapWidth));
        }

        return 0;
    }

    function getDatesToDisplay(count: number): Date[] {
        let dates = [];

        dates.push(currentDate);
        for (let i = 1; i < count; i++) {
            let date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            dates.push(date);
        }

        console.log(dates);

        return dates;
    }
</script>

<div
    class="inset-0 flex gap-x-3 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:dark:to-gray-900 before:from-70% before:to-95% before:pointer-events-none"
    bind:clientWidth={containerWidth}
>
    {#if pillsToCreate > 0}
        {#each dates as x, i}
            <DatePill date={x} isActive={selectedDate == x} />
        {/each}
    {/if}
</div>
