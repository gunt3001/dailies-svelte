<script lang="ts">
    import * as Card from "$lib/components/ui/card";

    interface Props {
        date: Date;
        dateText: string;
        dayDifferenceText: string;
        mood?: string;
        keyEvent?: string;
        content?: string;
        remarks?: string;
        isLoading?: boolean;
        isEmpty?: boolean;
        id: string;
    }

    let { 
        date, 
        dateText, 
        dayDifferenceText, 
        mood, 
        keyEvent, 
        content, 
        remarks, 
        isLoading = false, 
        isEmpty = false, 
        id 
    }: Props = $props();
</script>

<Card.Root class="rounded-md" id={id}>
    <div class="flex flex-row px-6 gap-8">
        <div class="whitespace-normal lg:whitespace-nowrap min-w-32 lg:min-w-64">
            <div class="font-semibold">
                {dateText}
            </div>
            <div class="text-muted-foreground text-sm">
                {dayDifferenceText}
            </div>
            <div class="mt-4 text-sm font-semibold">
                {mood || ""}
            </div>
        </div>
        {#if isLoading}
            <div>
                <em>Loading...</em>
            </div>
        {:else if isEmpty}
            <div>
                <em> No entry </em>
            </div>
        {:else}
            <div>
                <div class="font-semibold">{keyEvent || ""}</div>
                {content || ""}
                <div class="mt-4 text-muted-foreground whitespace-pre-wrap">
                    {remarks || ""}
                </div>
            </div>
        {/if}
    </div>
</Card.Root>