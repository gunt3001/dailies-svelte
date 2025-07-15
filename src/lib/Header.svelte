<script>

    import { page } from "$app/state";
    import { SITE_NAME } from "$lib/Constants";
    import Button from "./components/ui/button/button.svelte";
    import ThemeToggle from "./components/ThemeToggle.svelte";

    let currentPath = $derived(page.url.pathname);

</script>
<header class="text-gray-400 body-font">
    <div
        class="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center gap-y-3"
    >
        <a
            href="/"
            class="flex title-font font-semibold items-center text-white"
        >
            <img
                class="rounded-full w-10 h-10 bg-white p-1"
                src="profile.png"
                alt="A journaling notebook logo"
            />
            <span class="ml-3 text-xl">{SITE_NAME}</span>
        </a>
        <nav
            class="md:ml-4 md:pl-4 flex flex-wrap gap-2 items-center text-base justify-center text-white font-semibold"
        >
            <a
                class="hover:text-purple-200 py-2 px-4 rounded-lg text-center {currentPath === "/" ? "bg-black/20" : ""}"
                href="/">Home</a
            >
            <a
                class="hover:text-purple-200 py-2 px-4 rounded-lg text-center {currentPath === "/calendar" ? "bg-black/20" : ""}"
                href="/calendar">Calendar</a
            >
            <a class="hover:text-purple-200 py-2 px-4 rounded-lg text-center {currentPath === "/list" ? "bg-black/20" : ""}" href="/list"
                >List</a
            >
        </nav>

        <div class="md:ml-auto w-80 max-w-full flex items-center gap-2">
            <ThemeToggle />
            <form action="/search" method="GET" class="relative flex-1" data-sveltekit-reload>
                <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        /></svg
                    >
                </div>
                <input
                    type="search"
                    name="q"
                    id="default-search"
                    class="block w-full p-3 pl-10 text-sm text-gray-950 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Search entries"
                    required
                />
                <Button
                    type="submit"
                    class="absolute right-2.5 bottom-1 text-sm px-4 py-1.5"
                    >Search</Button
                >
            </form>
        </div>
    </div>
</header>
