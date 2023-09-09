<script>
    import EntryCard from "$lib/EntryCard.svelte";
    import DatePillsBar from "../lib/DatePillsBar.svelte";
    let statusText = "";
    let charCount = 0;
    const charCountThreshold = 180;
    function updateCharCount() {
        charCount = statusText.length;
    }
</script>

<div class="container mx-auto grid md:grid-cols-3 gap-4">
    <div
        class="col md:col-span-2 overflow-hidden p-8 drop-shadow bg-white rounded border dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <DatePillsBar />
        <h1 class="my-4 font-semibold text-2xl">Tuesday, 27 June 2023</h1>
        <textarea
            cols="30"
            rows="4"
            class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-4 text-l"
            placeholder="Say what's going on..."
            bind:value={statusText}
            on:input={updateCharCount}
        />
        <p
            class="font-semibold text-right text-gray-500"
            class:text-red-500={charCount > charCountThreshold}
        >
            <span>{charCount} / {charCountThreshold}</span>
        </p>
        <div class="grid grid-cols-2 gap-4">
            <div class="col">
                <h2 class="my-4 font-semibold text-xl">Key Event</h2>
                <input
                    type="text"
                    class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-2 text-l"
                />
            </div>
            <div class="col">
                <h2 class="my-4 font-semibold text-xl">Mood</h2>
                <input
                    type="text"
                    list="mood-list"
                    class="dark:bg-gray-900 w-full border-2 dark:border-gray-800 rounded-lg p-2 text-l"
                />
                <datalist id="mood-list">
                    <option value="Relaxed" >Relaxed (100)</option>
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
        />
        <div class="text-right">
            <button
                type="button"
                class="bg-purple-500 hover:bg-purple-600 font-medium rounded-lg py-2 w-32 mt-8 text-white drop-shadow"
                >Save</button
            >
        </div>
    </div>
    <div
        class="col p-8 drop-shadow overflow-hidde bg-white rounded border dark:bg-gray-900 dark:text-white dark:border-gray-800"
    >
        <h1 class="font-semibold text-xl">On this day...</h1>
        <h2 class="font-semibold text-lg">2 years ago</h2>
        <EntryCard />
        <h2 class="font-semibold text-lg">4 years ago</h2>
        <EntryCard />
        <h1 class="font-semibold text-xl">And 335 days ago...</h1>
        <EntryCard />
    </div>
</div>
