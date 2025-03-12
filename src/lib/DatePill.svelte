<script lang="ts">
    interface Props {
        date: Date;
        isActive?: boolean;
        isIncomplete?: boolean;
        onClick: () => void;
    }

    let { date, isActive = false, isIncomplete = true, onClick }: Props = $props();

    let hoverClasses = $derived(isActive ? "" : "hover:bg-purple-200 hover:dark:bg-purple-500/20");
</script>

<button
    onclick={() => { onClick() }}
    type="button"
    class="flex flex-col shrink-0 mb-3 w-14 h-20 font-semibold rounded-lg justify-center items-center border dark:border-gray-800 dark:bg-gray-800 {hoverClasses}"
    class:dark:bg-purple-800={isActive}
    class:bg-purple-500={isActive}
    class:text-white={isActive}
    class:dark:text-gray-600={isIncomplete && !isActive}
>
    <div class="text-center cursor-pointer">
        <div>
            <span
                class:text-red-500={date.getDay() === 0 && !isIncomplete && !isActive}
                class:text-blue-500={date.getDay() === 6 && !isIncomplete && !isActive}
                class:text-red-900={date.getDay() === 0 && isIncomplete && !isActive}
                class:text-blue-900={date.getDay() === 6 && isIncomplete && !isActive}
            >
                {date.toLocaleDateString("en-US", {
                    weekday: "short",
                })}
            </span>
        </div>
        <div class="text-3xl">
            {date.getDate().toString()}
        </div>
    </div>
</button>
