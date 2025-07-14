<script lang="ts">
    import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    interface Props {
        onClick: () => void;
    }

    let { onClick }: Props = $props();
</script>

<button
    onclick={() => { onClick() }}
    type="button"
    class="flex flex-col shrink-0 mb-3 w-14 h-20 font-semibold rounded-lg justify-center items-center border hover:bg-primary/5"
>
    <div class="text-center cursor-pointer">
        <div class="text-3xl">
            <Fa icon={faEllipsis} />
        </div>
    </div>
</button>
