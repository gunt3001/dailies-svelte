<script>
    import DatePill from "./DatePill.svelte";

</script>
<div class="flex gap-x-3 overflow-x-auto">
    <DatePill dayNumber="27" dayOfWeek="Tue" />
    <DatePill dayNumber="26" dayOfWeek="Mon" />
    <DatePill dayNumber="25" dayOfWeek="Sun" />
    <DatePill dayNumber="24" dayOfWeek="Sat" />
    <DatePill dayNumber="23" dayOfWeek="Fri" />
    <DatePill dayNumber="22" dayOfWeek="Thu" />
    <DatePill dayNumber="21" dayOfWeek="Wed" />
    <button type="button" class="mb-3 w-14 h-20 font-semibold text-center border rounded-lg">
        More dates
    </button>
</div>