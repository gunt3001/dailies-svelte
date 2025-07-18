<script lang="ts">
    import { fade } from "svelte/transition";
    import { browser } from "$app/environment";
    import { getEntriesManagerContext } from "./states/entries.svelte";
    import { ENTRY_CONTENT_WARN_LENGTH } from "./Constants";
    import { toLongDate } from "./utilities/dateFormatter";
    import EditorForm from "./EditorForm.svelte";
    import type IEntry from "./model/IEntry";
    import { parseDate } from "./utilities/dateUtilities";

    interface Props {
        editorDate?: string | null;
        onModalDismissed: () => void;
        onSubmitSuccess: (date: Date) => void;
    }

    let { editorDate = null, onModalDismissed, onSubmitSuccess }: Props = $props();

    const entriesManager = getEntriesManagerContext();

    async function fetchEntry(dateString: string): Promise<IEntry | null> {
        if (!browser) {
            return null;
        }
        const date = new Date(dateString);
        const entry = await entriesManager.getEntry(date);
        return entry;
    }

    function handleModalClick(event: MouseEvent) {
        onModalDismissed();
    }

    function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
            onModalDismissed();
        }
    }

    function handleSubmitSuccess() {
        if (!editorDate) return;
        onSubmitSuccess(parseDate(editorDate));
        onModalDismissed();
    }
</script>

<svelte:body onkeydown={handleEscape} />

{#if editorDate}
    <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <div
            class="fixed inset-0 bg-gray-500/75 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
        ></div>
        <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because the onclick is for dismissing a modal, and equivalent keyboard function is already provided on the body) -->
        <div
            class="fixed inset-0 z-10 w-screen overflow-y-auto"
            onclick={handleModalClick}
        >
            <div
                class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
                <div
                    class="relative transform overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
                    in:fade
                    onclick={(e) => e.stopPropagation()}
                >
                    <div class="bg-background px-6 pt-6 pb-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3
                                class="text-lg font-semibold leading-6 text-foreground"
                                id="modal-title"
                            >
                                {toLongDate(new Date(editorDate))}
                            </h3>
                            <button
                                type="button"
                                class="rounded-md bg-background text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onclick={onModalDismissed}
                            >
                                <span class="sr-only">Close</span>
                                <svg
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div class="mt-4">
                            {#await fetchEntry(editorDate)}
                                <p class="text-muted-foreground">
                                    Loading entry...
                                </p>
                            {:then entry}
                                <EditorForm
                                    date={parseDate(editorDate)}
                                    charCountWarning={ENTRY_CONTENT_WARN_LENGTH}
                                    {entry}
                                    onSubmitSuccess={handleSubmitSuccess}
                                />
                            {:catch}
                                <p class="text-destructive">
                                    Failed to load entry.
                                </p>
                            {/await}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
