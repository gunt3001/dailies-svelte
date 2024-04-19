/**
 * Reminds the user about unsaved changes using browser's built in confirm()
 * 
 * @returns true if user says yes, false otherwise
 */
export function browserConfirm(): boolean {
    return confirm("There are unsaved changes. Continue?");
}