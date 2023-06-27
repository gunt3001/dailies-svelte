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
            <span class="ml-3 text-xl">Dailies</span>
        </a>
        <nav
            class="md:ml-4 md:pl-4 flex flex-wrap gap-5 items-center text-base justify-center text-white font-semibold"
        >
            <a
                class="hover:text-purple-200 bg-black/20 p-2 rounded-lg text-center"
                href="/">Home</a
            >
            <a
                class="hover:text-purple-200 rounded-lg text-center"
                href="/calendar">Calendar</a
            >
            <a class="hover:text-purple-200 rounded-lg text-center" href="/list"
                >List</a
            >
        </nav>

        <div class="md:ml-auto w-96">
            <div class="relative">
                <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                    id="default-search"
                    class="block w-full p-3 pl-10 text-sm text-gray-950 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-800"
                    placeholder="Search entries"
                    required
                />
                <button
                    type="button"
                    class="text-white absolute right-2.5 bottom-1.5 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-4 py-1.5"
                    >Search</button
                >
            </div>
        </div>
    </div>
</header>
