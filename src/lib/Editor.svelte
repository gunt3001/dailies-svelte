<script lang="ts">
    import { entries } from "$lib/stores/entries";
    import { ENTRY_CONTENT_WARN_LENGTH } from "./Constants";
    import EditorForm from "./EditorForm.svelte";
    import type IEntry from "./model/IEntry";
    import { selectedDate } from "./stores/generic";
    import { toLongDate } from "./utilities/dateFormatter";

    // Initialize variables

    async function fetchEntry(selectedDate: Date): Promise<IEntry | null> {
        const entry = await entries.getEntry(selectedDate);
        return entry;
    }
</script>

<h1 class="my-4 font-semibold text-2xl">{toLongDate($selectedDate)}</h1>
<div>
    {#await fetchEntry($selectedDate)}
        <p>Loading entry...</p>
    {:then entry}
        <EditorForm charCountWarning={ENTRY_CONTENT_WARN_LENGTH} entry={entry} />
    {:catch}
        <p>Failed to load entry.</p>
    {/await}
</div>
