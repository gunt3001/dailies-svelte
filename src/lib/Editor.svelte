<script lang="ts">
    import { run } from 'svelte/legacy';

    import { entries } from "$lib/stores/entries";
    import { faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
    import { ENTRY_CONTENT_WARN_LENGTH } from "./Constants";
    import EditorForm from "./EditorForm.svelte";
    import type IEntry from "./model/IEntry";
    import { mainEditorHasUnsavedChanges, selectedDate } from "./stores/generic";
    import { toLongDate } from "./utilities/dateFormatter";
    import { beforeNavigate } from "$app/navigation";
    import { browserConfirm } from "./utilities/confirm";

    // Initialize variables
    let modified: boolean = $state(false);

    async function fetchEntry(selectedDate: Date): Promise<IEntry | null> {
        const entry = await entries.getEntry(selectedDate);
        return entry;
    }

    beforeNavigate(({ cancel }) => {
        if (modified && !browserConfirm()) {
            cancel();
        }
    });

    run(() => {
        $mainEditorHasUnsavedChanges = modified;
    });
</script>

<div>
    {#await fetchEntry($selectedDate)}
        <h1 class="my-4 font-semibold text-2xl">{toLongDate($selectedDate)}</h1>
        <p>Loading entry...</p>
    {:then entry}
        <div class="flex flex-row gap items-baseline">
            <h1 class="my-4 mr-4 font-semibold text-2xl">
                {toLongDate($selectedDate)}
            </h1>
            {#if entry === null}
                <Badge icon={faPenToSquare} colorStyle={ColorStyles.Gray}
                    >New entry</Badge
                >
            {/if}
            {#if modified}
                <Badge
                    icon={faPen}
                    roundStyle={false}
                    colorStyle={ColorStyles.Gray}>Modified</Badge
                >
            {/if}
        </div>
        <EditorForm
            bind:modified
            charCountWarning={ENTRY_CONTENT_WARN_LENGTH}
            {entry}
        />
    {:catch}
        <h1 class="my-4 font-semibold text-2xl">{toLongDate($selectedDate)}</h1>
        <p>Failed to load entry.</p>
    {/await}
</div>
