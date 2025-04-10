<script>
    import Editor from "$lib/Editor.svelte";
    import EntryCard from "$lib/EntryCard.svelte";
    import DatePillsBar from "../lib/DatePillsBar.svelte";


</script>

<div class="container mx-auto grid md:grid-cols-3 gap-4">
    <div
        class="col md:col-span-2 overflow-hidden p-8 drop-shadow bg-white rounded border dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <DatePillsBar />
        <Editor />        
    </div>
    <div
        class="col p-8 drop-shadow overflow-hidde bg-white rounded border dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <h1 class="font-semibold text-xl">On this day...</h1>
        <h2 class="font-semibold text-lg">2 years ago</h2>
        <EntryCard />
        <h2 class="font-semibold text-lg">4 years ago</h2>
        <EntryCard />
        <h1 class="font-semibold text-xl">And 335 days ago...</h1>
        <EntryCard />
    </div>
</div>
