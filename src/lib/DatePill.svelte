<script lang="ts">
    export let dayOfWeek: string;
    export let dayNumber: string;
</script>

<div class="flex flex-col shrink-0 mb-3 w-14 h-20 font-semibold text-center border rounded-lg justify-center">
    <div>{dayOfWeek}</div>
    <div class="text-3xl">{dayNumber}</div>
</div>