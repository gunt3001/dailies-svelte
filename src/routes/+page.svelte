<script>
    import Editor from "$lib/Editor.svelte";
    import DatePillsBar from "../lib/DatePillsBar.svelte";
    import * as Card from "$lib/components/ui/card";
</script>

<div class="container mx-auto grid md:grid-cols-3 gap-4">
    <Card.Root class="col md:col-span-2 p-8 rounded-sm">
        <DatePillsBar />
        <Editor />
    </Card.Root>
    <Card.Root class="col p-8 rounded-sm">
        <h1 class="font-semibold text-xl">On this day...</h1>
        <h2 class="font-semibold text-lg">2 years ago</h2>
        <!-- <EntryCard /> -->
        <h2 class="font-semibold text-lg">4 years ago</h2>
        <!-- <EntryCard /> -->
        <h1 class="font-semibold text-xl">And 335 days ago...</h1>
        <!-- <EntryCard /> -->
    </Card.Root>
</div>
