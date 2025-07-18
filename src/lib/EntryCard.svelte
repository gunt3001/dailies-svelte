<script lang="ts">
    import type IEntry from "./model/IEntry";
    import EntryCardRaw from "./EntryCardRaw.svelte";
    import { formatDate, getDayDifferenceText } from "./utilities/dateUtilities";
    import { toLongDate } from "./utilities/dateFormatter";
    import { getEntriesManagerContext } from "./states/entries.svelte";

    interface Props {
        date: Date;
        id: string;
    }

    let { date, id }: Props = $props();

    // Current entry
    // null means empty entry. undefined means loading.
    const entriesManager = getEntriesManagerContext();
    let entry: IEntry | null | undefined = $derived(entriesManager.cachedEntries[formatDate(date)]);
</script>

<EntryCardRaw 
    {date}
    {id}
    dateText={toLongDate(date)}
    dayDifferenceText={getDayDifferenceText(date, new Date())}
    mood={entry?.mood}
    keyEvent={entry?.keyEvent}
    content={entry?.content}
    remarks={entry?.remarks}
    isLoading={entry === undefined}
    isEmpty={entry === null}
/>
