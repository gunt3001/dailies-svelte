<script context="module" lang="ts">
    export enum ColorStyles {
        Gray = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400",
        Blue = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };
</script>
<script lang="ts">
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let icon: IconDefinition;
    export let colorStyle: ColorStyles = ColorStyles.Gray;
    export let roundStyle: boolean = false;
</script>

<span
    class={"text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 " + 
    colorStyle + (roundStyle ? " rounded-full" : " rounded")
    }
>
    <Fa {icon} class="mr-1.5" />
    <slot />
</span>
