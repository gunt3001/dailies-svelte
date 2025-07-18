<script lang="ts">
    import { faCampground } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
    import type IEntry from "./model/IEntry";
    import { getAppStateContext } from "./states/global.svelte";
    import { formatDate } from "./utilities/dateUtilities";
    import { SeriesUtilities } from "./utilities/seriesUtilities";
    import { enhance } from "$app/forms";
    import { getEntriesManagerContext } from "./states/entries.svelte";
    import Button from "./components/ui/button/button.svelte";

    // Context
    const appState = getAppStateContext();
    const entriesManager = getEntriesManagerContext();

    interface Props {
        // Number of characters before the warning is shown
        charCountWarning: number;
        // An existing entry to edit, or null if creating a new entry
        entry: IEntry | null;
        // Date this entry will be saved to
        date: Date;
        // Callback when form submission succeeds
        onSubmitSuccess?: () => void;
    }

    let { charCountWarning, entry, date, onSubmitSuccess }: Props = $props();

    // Form fields
    // We maintain states for the fields separate from the entry object
    // so that we can detect changes in the form fields
    let content = $state(entry?.content ?? "");
    let keyEvent = $state(entry?.keyEvent ?? "");
    let mood = $state(entry?.mood ?? "");
    let remarks = $state(entry?.remarks ?? "");

    // Flag to track when form is in the middle of a submission
    let isSubmitting = $state(false);

    // Derived states
    let series = $derived(SeriesUtilities.getSeries(content));
    let charCount = $derived(content.length - (series ? series.length + 3 : 0));

    // Update global state when there are changes in the form fields
    function onFormFieldUpdated() {
        appState.mainEditorHasUnsavedChanges =
            (entry !== null &&
                (entry.content != content ||
                    entry.keyEvent != keyEvent ||
                    entry.mood != mood ||
                    entry.remarks != remarks)) ||
            (entry === null &&
                (content != "" ||
                    keyEvent != "" ||
                    mood != "" ||
                    remarks != ""));
    }


    function onSubmit(event: Event) {
        // Remove the editor has unsaved changes flag before continuing
        // to prevent the browser from showing the confirmation dialog
        // when the form is submitted
        appState.mainEditorHasUnsavedChanges = false;
    }
</script>

<form
    method="POST"
    action="/?/updateEntry"
    onsubmit={onSubmit}
    use:enhance={() => {
        isSubmitting = true;
        return async ({ update, result }) => {
            isSubmitting = false;
            // Invalidate the new entry to re-fetch from server
            delete entriesManager.cachedEntries[formatDate(date)];
            await update();
            
            // Call success callback if form submission succeeded
            if (result.type === 'redirect' && onSubmitSuccess) {
                onSubmitSuccess();
            }
        };
    }}
>
    <input type="hidden" name="date" value={formatDate(date)} />
    <textarea
        name="content"
        cols="30"
        rows="4"
        class="w-full border-2 rounded-lg p-4 text-l
        disabled:bg-muted disabled:text-muted-foreground transition-colors"
        placeholder="Say what's going on..."
        bind:value={content}
        oninput={() => onFormFieldUpdated()}
        disabled={isSubmitting}
    ></textarea>
    <div class="flex flex-row-reverse justify-between mt-2">
        <p
            class="font-semibold text-gray-500 justify-self-end"
            class:text-red-500={charCount > charCountWarning}
        >
            <span>{charCount} / {charCountWarning}</span>
        </p>
        {#if series}
            <Badge
                icon={faCampground}
                roundStyle={true}
                colorStyle={ColorStyles.Blue}>{series}</Badge
            >
        {/if}
    </div>
    <div class="grid grid-cols-3 gap-4">
        <div class="col-span-3 xl:col-span-2">
            <h2 class="my-4 font-semibold text-xl">Key Event</h2>
            <input
                name="keyEvent"
                type="text"
                class="w-full border-2 rounded-lg p-2 text-l
                disabled:bg-muted disabled:text-muted-foreground transition-colors"
                bind:value={keyEvent}
                oninput={() => onFormFieldUpdated()}
                disabled={isSubmitting}
            />
        </div>
        <div class="col-span-3 xl:col-span-1">
            <h2 class="my-4 font-semibold text-xl">Mood</h2>
            <input
                name="mood"
                type="text"
                list="mood-list"
                class="w-full border-2 rounded-lg p-2 text-l
                disabled:bg-muted disabled:text-muted-foreground transition-colors"
                bind:value={mood}
                oninput={() => onFormFieldUpdated()}
                disabled={isSubmitting}
            />
            <datalist id="mood-list">
                <option value="Relaxed">Relaxed (100)</option>
                <option value="Fun">Fun (20)</option>
                <option value="Stressed">Stressed (10)</option>
            </datalist>
        </div>
    </div>
    <h2 class="my-4 font-semibold text-xl">Remarks</h2>
    <textarea
        name="remarks"
        cols="30"
        rows="4"
        class="w-full border-2 rounded-lg p-4 text-l
        disabled:bg-muted disabled:text-muted-foreground transition-colors"
        bind:value={remarks}
        oninput={() => onFormFieldUpdated()}
        disabled={isSubmitting}
    ></textarea>
    <div class="text-right">
        <Button
            type="submit"
            class="font-medium w-32 mt-8 h-12 text-lg"
            disabled={isSubmitting}
        >
            {#if isSubmitting}
                <span class="animate-pulse">Saving...</span>
            {:else}
                Save
            {/if}
        </Button>
    </div>
</form>
