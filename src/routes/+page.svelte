<script>
    import Editor from "$lib/Editor.svelte";
    import DatePillsBar from "../lib/DatePillsBar.svelte";
    import * as Card from "$lib/components/ui/card";
    import Memory from "$lib/components/Memory.svelte";

    let { data } = $props();
</script>

<div class="container mx-auto grid md:grid-cols-3 gap-4">
    <Card.Root class="col md:col-span-2 p-8 rounded-sm">
        <DatePillsBar />
        <Editor />
    </Card.Root>
    <Card.Root class="col p-8 rounded-sm">
        <Memory memoryEntries={data.memoryEntries} randomEntry={data.randomEntry} />
    </Card.Root>
</div>
