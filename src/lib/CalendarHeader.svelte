<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faChevronLeft,
        faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";

    export let month: number;
    export let year: number;

    function incrementMonth(amount: number) {
        month += amount;
        while (month > 11) {
            month -= 12;
            year++;
        }
        while (month < 0) {
            month += 12;
            year--;
        }
    }
</script>

<div class="flex flex-row">
    <button
        type="button"
        class="flex-none text-xl px-8"
        on:click={(_) => incrementMonth(-1)}
    >
        <Fa icon={faChevronLeft} />
    </button>
    <div class="text-center flex-1">
        <h1 class="text-3xl font-medium h-10">
            {new Date(year, month, 1).toLocaleDateString(undefined, { month: "long" })}
        </h1>
        <input
            class="rounded dark:bg-gray-900 pr-2 pl-4 py-1 text-center"
            type="number"
            value={year}
            on:input={(e) => (year = parseInt(e.currentTarget.value))}
        />
    </div>
    <button
        type="button"
        class="flex-none text-xl px-8"
        on:click={(_) => incrementMonth(1)}
    >
        <Fa icon={faChevronRight} />
    </button>
</div>
