import { writable } from "svelte/store";

// Create a new writable store for the currently selected date
export const selectedDate = writable(new Date());
