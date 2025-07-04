<script>
    import Calendar from "$lib/components/ui/calendar/calendar.svelte";
    import EntryCard from "$lib/EntryCard.svelte";
</script>

<div class="container mx-auto flex flex-wrap gap-4 items-start">
        <Calendar
            type="single"
            class="w-full md:w-auto p-8 rounded-md border shadow-sm sticky top-6"
            captionLayout="dropdown"
        />
    
    <div
        class="flex-1 p-0 flex flex-col gap-4"
    >
        <EntryCard entry={{
            date: "",
            keyEvent: "Sample Key event",
            content: "Sample entry content. This is some detailed description of the entry, and may be up to 180 characters long.",
            mood: "Happy",
            remarks: "This is a sample remarks. It could be up to several paragraphs long.\n\nHere is another paragraph."
        }} date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
        <EntryCard date={new Date()}/>
    </div>
</div>
