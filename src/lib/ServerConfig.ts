import { env } from '$env/dynamic/private';

// Server-side configuration variables
// These can be overridden with environment variables

// Whether to use the legacy API mode (compatible with classic Dailies app)
export const LEGACY_API_MODE = env.LEGACY_API_MODE !== undefined 
  ? env.LEGACY_API_MODE === 'true' 
  : true;

// URL for the API endpoint when legacy mode is active
export const LEGACY_API_ENDPOINT_URL = env.LEGACY_API_ENDPOINT_URL || "http://example-legacy-api";

// Connection string for SQLite database
export const SQLITE_DB_CONNECTION = env.SQLITE_DB_CONNECTION || "sqlite://:memory:"; 