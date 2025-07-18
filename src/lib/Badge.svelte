<script module lang="ts">
    export enum ColorStyles {
        Gray = "bg-muted text-muted-foreground",
        Blue = "bg-primary text-primary-foreground",
    };
</script>
<script lang="ts">
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    interface Props {
        icon: IconDefinition;
        colorStyle?: ColorStyles;
        roundStyle?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        icon,
        colorStyle = ColorStyles.Gray,
        roundStyle = false,
        children
    }: Props = $props();
</script>

<span
    class={"max-w-full text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-sm me-2 " + 
    colorStyle + (roundStyle ? " rounded-full" : " rounded-sm")
    }
>
    <Fa {icon} class="mr-1.5" />
    {@render children?.()}
</span>
