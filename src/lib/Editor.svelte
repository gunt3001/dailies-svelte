<script lang="ts">
    import { entries } from "$lib/stores/entries";
    import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
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

<div>
    {#await fetchEntry($selectedDate)}
        <h1 class="my-4 font-semibold text-2xl">{toLongDate($selectedDate)}</h1>
        <p>Loading entry...</p>
    {:then entry}
        <div class="flex flex-row gap-4 items-baseline">
            <h1 class="my-4 font-semibold text-2xl">
                {toLongDate($selectedDate)}
            </h1>
            {#if entry === null}
                <Badge icon={faPenToSquare} colorStyle={ColorStyles.Gray}>New entry</Badge>
            {/if}
        </div>
        <EditorForm charCountWarning={ENTRY_CONTENT_WARN_LENGTH} {entry} />
    {:catch}
        <h1 class="my-4 font-semibold text-2xl">{toLongDate($selectedDate)}</h1>
        <p>Failed to load entry.</p>
    {/await}
</div>
