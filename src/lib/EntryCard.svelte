<script lang="ts">
    import type IEntry from "./model/IEntry";
    import * as Card from "$lib/components/ui/card";
    import { getDayDifferenceText, parseDate } from "./utilities/dateUtilities";
    import { toLongDate } from "./utilities/dateFormatter";

    interface Props {
        date: Date;
        entry: IEntry | null;
    }

    let { date, entry }: Props = $props();
</script>

<Card.Root class="rounded-md">
    <div class="flex flex-row px-6 gap-8">
        <div class="flex-none">
            <div class="font-semibold">
                {toLongDate(date)}
            </div>
            <div class="text-muted-foreground text-sm">
                {getDayDifferenceText(date, new Date())}
            </div>
            <div class="mt-4 text-sm font-semibold">
                {entry?.mood}
            </div>
        </div>
        {#if entry}
            <div>
                <div class="font-semibold">{entry.keyEvent}</div>
                {entry.content}
                <div class="mt-4 text-muted-foreground">
                    {entry.remarks}
                </div>
            </div>
        {:else}
            <div>
                <em> No entry </em>
            </div>
        {/if}
    </div>
</Card.Root>
