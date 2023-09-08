<script lang="ts">
    export let date: Date;
    export let isActive: boolean = false;
</script>

<button
    type="button"
    class="flex flex-col shrink-0 mb-3 w-14 h-20 font-semibold rounded-lg justify-center items-center border dark:border-gray-800 dark:bg-gray-800 hover:bg-purple-200 hover:dark:bg-purple-500/20"
    class:dark:bg-purple-800={isActive}
>
    <div class="text-center cursor-pointer">
        <div>
            <span
                class:text-red-500={date.getDay() === 0}
                class:text-blue-500={date.getDay() === 6}
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
