<script lang="ts">
    import { createAndSetEntriesManagerContext } from "$lib/states/entries.svelte";
    import { createAndSetAppStateContext } from "$lib/states/global.svelte";
    import { SITE_NAME } from "$lib/Constants";
    import "../app.css";
    import Header from "../lib/Header.svelte";
    import { ModeWatcher } from "mode-watcher";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    // Context setup
    createAndSetEntriesManagerContext();
    createAndSetAppStateContext();
</script>

<svelte:head>
    <title>{SITE_NAME}</title>
</svelte:head>

<ModeWatcher />

<div class="absolute w-full">
    <div class="h-52 w-full bg-primary"></div>
    <div class="min-h-screen bg-white"></div>
</div>

<div class="relative">
    <Header />
    {@render children?.()}
</div>