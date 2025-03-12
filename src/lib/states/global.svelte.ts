// This file store any global state variables shared between components
// (a few of these were migrated from Stores prior to the migration to Svelte 5)

interface IAppState {
    selectedDate: Date;
    mainEditorHasUnsavedChanges: boolean;
}

export const appState: IAppState = $state({
    // Currently selected date (global throughout app)
    // Defaults to today
    selectedDate: new Date(),
    // Flag whether the main editor in landing page has unsaved changes
    mainEditorHasUnsavedChanges: false
})
