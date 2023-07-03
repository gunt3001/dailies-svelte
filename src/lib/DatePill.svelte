<script lang="ts">
    export let dayOfWeek: string;
    export let dayNumber: string;
</script>

<button type="button" class="flex flex-col shrink-0 mb-3 w-14 h-20 font-semibold rounded-lg justify-center items-center dark:bg-white/5">
    <div class="text-center">
        <div>{dayOfWeek}</div>
        <div class="text-3xl">{dayNumber}</div>
    </div>
    
</button>