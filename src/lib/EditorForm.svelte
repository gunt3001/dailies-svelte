<script lang="ts">
    import { faCampground } from "@fortawesome/free-solid-svg-icons";
    import Badge, { ColorStyles } from "./Badge.svelte";
import type IEntry from "./model/IEntry";

    // Props
    export let charCountWarning: number;
    export let entry: IEntry | null;

    // Form variables
    let content = entry?.content ?? "";
    let keyEvent = entry?.keyEvent ?? "";
    let mood = entry?.mood ?? "";
    let remarks = entry?.remarks ?? "";
    let charCount = 0;
    let series: string | null = null;

    $: charCount = content.length - (series ? series.length + 3 : 0);
    $: series = getSeries(content);

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
</script>

<textarea
    cols="30"
    rows="4"
    class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-4 text-l"
    placeholder="Say what's going on..."
    bind:value={content}
/>
<div class="flex flex-row-reverse justify-between mt-2">
    <p
        class="font-semibold text-gray-500 justify-self-end"
        class:text-red-500={charCount > charCountWarning}
    >
        <span>{charCount} / {charCountWarning}</span>
    </p>
    {#if series}
        <Badge icon={faCampground} roundStyle={true} colorStyle={ColorStyles.Blue}>{series}</Badge>
    {/if}
</div>
<div class="grid grid-cols-2 gap-4">
    <div class="col">
        <h2 class="my-4 font-semibold text-xl">Key Event</h2>
        <input
            type="text"
            class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-2 text-l"
            bind:value={keyEvent}
        />
    </div>
    <div class="col">
        <h2 class="my-4 font-semibold text-xl">Mood</h2>
        <input
            type="text"
            list="mood-list"
            class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-2 text-l"
            bind:value={mood}
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
    cols="30"
    rows="4"
    class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-4 text-l"
    bind:value={remarks}
/>
<div class="text-right">
    <button
        type="button"
        class="bg-purple-500 hover:bg-purple-600 font-medium rounded-lg py-2 w-32 mt-8 text-white drop-shadow"
        >Save</button
    >
</div>
