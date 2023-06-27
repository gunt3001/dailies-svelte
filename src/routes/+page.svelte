<script lang="ts">
    import { onMount } from "svelte";
    let entries: any[] = [];

    onMount(async () => {
        const res = await fetch("/api/entries");
        entries = await res.json();
    });
</script>

<table>
    <thead>
        <tr>
            <th>Date</th>
            <th>Content</th>
            <th>Keyword</th>
            <th>Mood</th>
            <th>Remarks</th>
        </tr>
    </thead>
    <tbody>
        {#each entries as entry (entry.Date)}
            <tr>
                <td>{entry.Date}</td>
                <td>{entry.Content}</td>
                <td>{entry.Keyword}</td>
                <td>{entry.Mood}</td>
                <td>{entry.Remarks}</td>
            </tr>
        {/each}
    </tbody>
</table>
