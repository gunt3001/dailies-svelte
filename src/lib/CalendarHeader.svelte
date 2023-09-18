<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faChevronLeft,
        faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";
    import { selectedDate } from "./stores/generic";

    const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

    function incrementMonth(date: Date, amount: number): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth() + amount,
            date.getDate()
        );
    }

    function setYear(date: Date, year: number): Date {
        return new Date(year, date.getMonth(), date.getDate());
    }
</script>

<div class="flex flex-row">
    <button
        type="button"
        class="flex-none text-xl px-8"
        on:click={(_) =>
            selectedDate.update((date) => incrementMonth(date, -1))}
    >
        <Fa icon={faChevronLeft} />
    </button>
    <div class="text-center flex-1">
        <h1 class="text-3xl font-medium h-10">
            {$selectedDate.toLocaleDateString(undefined, { month: "long" })}
        </h1>
        <input
            class="rounded dark:bg-gray-900 pr-2 pl-4 py-1 text-center"
            type="number"
            value={$selectedDate.getFullYear()}
            on:input={(e) =>
                selectedDate.update((date) =>
                    setYear(date, parseInt(e.currentTarget.value))
                )}
        />
    </div>
    <button
        type="button"
        class="flex-none text-xl px-8"
        on:click={(_) => selectedDate.update((date) => incrementMonth(date, 1))}
    >
        <Fa icon={faChevronRight} />
    </button>
</div>
