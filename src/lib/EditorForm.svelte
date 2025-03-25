<script lang="ts">
    import { faCampground } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
    import type IEntry from "./model/IEntry";
    import { getAppStateContext } from "./states/global.svelte";
    import { formatDate } from "./utilities/dateUtilities";
    import { enhance } from "$app/forms";

    // Context
    const appState = getAppStateContext();

    interface Props {
        // Number of characters before the warning is shown
        charCountWarning: number;
        // An existing entry to edit, or null if creating a new entry
        entry: IEntry | null;
        // Date this entry will be saved to
        date: Date;
    }

    let { charCountWarning, entry, date }: Props = $props();

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
    let series = $derived(getSeries(content));
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

    function getSeries(content: string): string | null {
        // If the content is prefixed like '[some series name] content',
        // extract the series name
        const seriesRegex = /^\[(.+)\] (.+)$/;
        const match = seriesRegex.exec(content);
        if (match) {
            return match[1];
        }
        return null;
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
    action="?/updateEntry"
    onsubmit={onSubmit}
    use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
            await update();
            isSubmitting = false;
        };
    }}
>
    <input type="hidden" name="date" value={formatDate(date)} />
    <textarea
        name="content"
        cols="30"
        rows="4"
        class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-4 text-l
        disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:text-gray-500 transition-colors"
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
                class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-2 text-l
                disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:text-gray-500 transition-colors"
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
                class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-2 text-l
                disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:text-gray-500 transition-colors"
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
        class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-4 text-l
        disabled:bg-gray-100 disabled:dark:bg-gray-800 disabled:text-gray-500 transition-colors"
        bind:value={remarks}
        oninput={() => onFormFieldUpdated()}
        disabled={isSubmitting}
    ></textarea>
    <div class="text-right">
        <button
            type="submit"
            class="bg-purple-500 hover:bg-purple-600 font-medium rounded-lg py-2 w-32 mt-8 text-white drop-shadow
            disabled:bg-purple-300 disabled:drop-shadow-none disabled:dark:bg-gray-800 disabled:dark:text-gray-500 transition-colors
            "
            disabled={isSubmitting}
        >
            {#if isSubmitting}
                <span class="animate-pulse">Saving...</span>
            {:else}
                Save
            {/if}
        </button>
    </div>
</form>
