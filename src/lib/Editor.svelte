<script lang="ts">
    import { entries } from "$lib/stores/entries";
    import { faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
    import { ENTRY_CONTENT_WARN_LENGTH } from "./Constants";
    import EditorForm from "./EditorForm.svelte";
    import type IEntry from "./model/IEntry";
    import { appState } from "./states/global.svelte";
    import { toLongDate } from "./utilities/dateFormatter";
    import { beforeNavigate } from "$app/navigation";
    import { browserConfirm } from "./utilities/confirm";

    async function fetchEntry(selectedDate: Date): Promise<IEntry | null> {
        const entry = await entries.getEntry(selectedDate);
        return entry;
    }

    // Stop user from navigating away if there are unsaved changes
    beforeNavigate(({ cancel }) => {
        if (appState.mainEditorHasUnsavedChanges && !browserConfirm()) {
            cancel();
        }
    });

</script>

<div>
    {#await fetchEntry(appState.selectedDate)}
        <h1 class="my-4 font-semibold text-2xl">{toLongDate(appState.selectedDate)}</h1>
        <p>Loading entry...</p>
    {:then entry}
        <div class="flex flex-row gap items-baseline">
            <h1 class="my-4 mr-4 font-semibold text-2xl">
                {toLongDate(appState.selectedDate)}
            </h1>
            {#if entry === null}
                <Badge icon={faPenToSquare} colorStyle={ColorStyles.Gray}
                    >New entry</Badge
                >
            {/if}
            {#if appState.mainEditorHasUnsavedChanges}
                <Badge
                    icon={faPen}
                    roundStyle={false}
                    colorStyle={ColorStyles.Gray}>Modified</Badge
                >
            {/if}
        </div>
        <EditorForm
            charCountWarning={ENTRY_CONTENT_WARN_LENGTH}
            {entry}
        />
    {:catch}
        <h1 class="my-4 font-semibold text-2xl">{toLongDate(appState.selectedDate)}</h1>
        <p>Failed to load entry.</p>
    {/await}
</div>
