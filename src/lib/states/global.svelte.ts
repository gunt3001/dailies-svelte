// This file store any global state variables shared between components
// (a few of these were migrated from Stores prior to the migration to Svelte 5)

import { getContext, setContext } from "svelte";

interface IAppState {
    selectedDate: Date;
    mainEditorHasUnsavedChanges: boolean;
}

// Convenience functions for setting and getting the global app state context
const APP_STATE_CONTEXT_KEY = Symbol("AppState");
export function createAndSetAppStateContext() {
    let appState: IAppState = $state({
        // Currently selected date (global throughout app)
        // Defaults to today
        selectedDate: new Date(),
        // Flag whether the main editor in landing page has unsaved changes
        mainEditorHasUnsavedChanges: false
    });
    return setContext(APP_STATE_CONTEXT_KEY, appState);
}
export function getAppStateContext() {
    return getContext<ReturnType<typeof createAndSetAppStateContext>>(APP_STATE_CONTEXT_KEY);
}