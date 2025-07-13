# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run Svelte type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm run lint` - Run ESLint

## Project Architecture

**Dailies** is a daily diary/journaling SvelteKit application with both client and server-side state management. The app supports two backend modes: Legacy API (compatible with existing .NET Dailies app) and SQLite database.

### Key Architecture Components

**Data Layer:**
- `IEntry` interface defines journal entry structure (date, content, keyEvent, mood, remarks)
- `IServerEntriesManager` interface abstracts server-side data operations
- Two implementations: `LegacyAPIServerEntriesManager` and `SqliteServerEntriesManager`
- Backend mode controlled by `LEGACY_API_MODE` environment variable

**State Management:**
- Client-side: `ClientEntriesManager` class in `src/lib/states/entries.svelte.ts` using Svelte 5 runes
- Entries cached in dictionary format keyed by "YYYY-MM-DD" date strings
- Intelligent pre-fetching of nearby entries for better UX
- Server-side: Form actions in `+page.server.ts` handle entry CRUD operations

**UI Components:**
- Calendar view (`/calendar`) for monthly navigation
- List view (`/list`) for chronological browsing
- Entry editing through `EditorModal` and `EditorForm`
- Custom calendar components in `src/lib/components/ui/calendar/`
- Styling with TailwindCSS and shadcn-svelte UI library

### Configuration

Server configuration in `src/lib/ServerConfig.ts`:
- `LEGACY_API_MODE` - Toggle between API modes (default: true)
- `LEGACY_API_ENDPOINT_URL` - Legacy API endpoint
- `SQLITE_DB_CONNECTION` - SQLite connection string

### Data Flow

1. Client requests entries through `ClientEntriesManager`
2. Manager checks local cache, fetches from API if needed
3. Server-side manager (Legacy or SQLite) handles data persistence
4. Form submissions processed through SvelteKit actions
5. Successful updates redirect to calendar view

### Important Files

- `src/lib/states/entries.svelte.ts` - Client state management
- `src/lib/services/IServerEntriesManager.ts` - Server data abstraction
- `src/routes/+page.server.ts` - Form action handlers
- `src/lib/model/IEntry.ts` - Core data interfaces
- `src/lib/ServerConfig.ts` - Environment configuration

The application uses Svelte 5 runes for reactivity and is configured for Node.js deployment with `@sveltejs/adapter-node`.