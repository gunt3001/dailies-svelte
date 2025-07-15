<script lang="ts">
    import Fa from "svelte-fa";
    import {
        faChevronLeft,
        faChevronRight,
    } from "@fortawesome/free-solid-svg-icons";

    interface Props {
        month: number;
        year: number;
    }

    // Create bindable props so this component can update month and year state in the parent (Calendar.svelte)
    let { month = $bindable(), year = $bindable() }: Props = $props();

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
        onclick={(_) => incrementMonth(-1)}
    >
        <Fa icon={faChevronLeft} />
    </button>
    <div class="text-center flex-1">
        <h1 class="text-3xl font-medium h-10">
            {new Date(year, month, 1).toLocaleDateString(undefined, { month: "long" })}
        </h1>
        <input
            class="rounded-sm pr-2 pl-4 py-1 text-center"
            type="number"
            value={year}
            oninput={(e) => (year = parseInt(e.currentTarget.value))}
        />
    </div>
    <button
        type="button"
        class="flex-none text-xl px-8"
        onclick={(_) => incrementMonth(1)}
    >
        <Fa icon={faChevronRight} />
    </button>
</div>
