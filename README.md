# dailies-svelte

### Note: Project is currently in an early work-in-progress stage.

**Dailies** is a modern daily diary/journaling application built with [Svelte 5](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/). It provides a clean, intuitive interface for recording daily thoughts, experiences, and reflections.

This is a port of [an existing .NET / Blazor WebAssembly-based application of the same name](https://github.com/gunt3001/dailies). The database file of both projects are designed to be interoperable.

## Features

- **Multiple Views**: Browse your entries through calendar or chronological list views
- **Rich Entry Management**: Record daily entries with content, key events, mood tracking, and remarks
- **Intelligent Caching**: Client-side state management with smart pre-fetching for better performance
- **Responsive Design**: Clean, modern UI built with TailwindCSS and shadcn-svelte components
- **Legacy API Support**: Compatible with existing .NET Dailies application data
- **Modal Editor**: In-place editing with unsaved changes protection

## Technology Stack

- **Frontend**: Svelte 5 with runes for reactivity
- **Framework**: SvelteKit with SSR support
- **Styling**: TailwindCSS + shadcn-svelte UI components
- **Package Manager**: pnpm
- **Deployment**: Node.js with @sveltejs/adapter-node

## Architecture

The application follows a clean architecture pattern with:

- **Data Layer**: Abstracted server-side data operations through `IServerEntriesManager`
- **State Management**: Client-side `ClientEntriesManager` using Svelte 5 runes
- **UI Components**: Modular components with calendar and list views
- **Form Handling**: SvelteKit form actions for CRUD operations

## Setup & Installation

1. **Prerequisites**: Ensure you have Node.js and pnpm installed
2. **Clone the repository**:
   ```bash
   git clone https://github.com/gunt3001/dailies-svelte.git
   cd dailies-svelte
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Start development server**:
   ```bash
   pnpm run dev
   ```

## Development Commands

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run check` - Run Svelte type checking
- `pnpm run check:watch` - Run type checking in watch mode
- `pnpm run lint` - Run ESLint

## Future Roadmap

### Version 2.0 - SQLite Database Support

A major update is planned that will introduce native SQLite database support, providing:

- **Local Database Storage**: Store entries in a local SQLite database for improved performance
- **Enhanced Data Management**: More robust data persistence and querying capabilities
- **Migration Tools**: Seamless migration from Legacy API to SQLite backend
- **Offline Support**: Full offline functionality with local data storage
- **Advanced Features**: Support for more complex queries, filtering, and data analysis

This will complement the existing Legacy API mode while providing a more modern, self-contained storage solution.

## For Educational Purposes

This project is meant for educational purposes and to explore web technologies. The application contains no authentication and is not suitable if you want to keep your journal a secret!

## License

MIT License © Napat Ratanakul

