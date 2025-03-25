<script lang="ts">
    import { faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
    import { ENTRY_CONTENT_WARN_LENGTH } from "./Constants";
    import EditorForm from "./EditorForm.svelte";
    import type IEntry from "./model/IEntry";
    import { toLongDate } from "./utilities/dateFormatter";
    import { beforeNavigate } from "$app/navigation";
    import { browserConfirm } from "./utilities/confirm";
    import { browser } from "$app/environment";
    import { getEntriesManagerContext } from "./states/entries.svelte";
    import { getAppStateContext } from "./states/global.svelte";

    // Context 
    const entriesManager = getEntriesManagerContext();
    const appState = getAppStateContext();

    async function fetchEntry(selectedDate: Date): Promise<IEntry | null> {
        // Only fetch entry from the browser, not during SSR
        if (!browser) {
            return null;
        }
        const entry = await entriesManager.getEntry(selectedDate);
        return entry;
    }

    // Stop user from navigating away if there are unsaved changes
    beforeNavigate(({ cancel }) => {
        if (appState.mainEditorHasUnsavedChanges) {
            if (!browserConfirm()) {
                // Cancel navigation if user decides to stay
                cancel();
            }
            else {
                // Reset unsaved changes flag if user decides to navigate away
                appState.mainEditorHasUnsavedChanges = false;
            }
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
            date={appState.selectedDate}
            charCountWarning={ENTRY_CONTENT_WARN_LENGTH}
            {entry}
        />
    {:catch}
        <h1 class="my-4 font-semibold text-2xl">{toLongDate(appState.selectedDate)}</h1>
        <p>Failed to load entry.</p>
    {/await}
</div>
