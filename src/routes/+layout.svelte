<script>
    import "../app.css";
    import Header from "../lib/Header.svelte";
</script>


<div class="absolute">
    <div class="h-52 w-screen bg-primary"></div>
    <div class="min-h-screen bg-white dark:bg-gray-900"></div>
</div>

<div class="relative">
    <Header />
    <slot></slot>
</div>