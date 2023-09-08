<script lang="ts">
    export let date: Date;
</script>

<button
    type="button"
    class="flex flex-col shrink-0 mb-3 w-14 h-20 font-semibold rounded-lg justify-center items-center border dark:border-gray-800 dark:bg-white/5 hover:bg-purple-300 hover:dark:bg-purple-900"
>
    <div class="text-center cursor-pointer">
        <div>
            {#if date.getDay() === 0}
                <!-- Sunday -->
                <span class="text-red-500">
                    {date.toLocaleDateString("en-US", {
                        weekday: "short",
                    })}
                </span>
            {:else if date.getDay() === 6}
                <span class="text-blue-500">
                    {date.toLocaleDateString("en-US", {
                        weekday: "short",
                    })}
                </span>
            {:else}
                {date.toLocaleDateString("en-US", {
                    weekday: "short",
                })}
            {/if}
        </div>
        <div class="text-3xl">
            {date.getDate().toString()}
        </div>
    </div>
</button>
