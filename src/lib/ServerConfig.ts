// Server-side configuration variables
// These can be overridden with environment variables

// Define process.env type for TypeScript
declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};

// Whether to use the legacy API mode (compatible with classic Dailies app)
export const LEGACY_API_MODE = process.env.LEGACY_API_MODE !== undefined 
  ? process.env.LEGACY_API_MODE === 'true' 
  : true;

// URL for the API endpoint when legacy mode is active
export const LEGACY_API_ENDPOINT_URL = process.env.LEGACY_API_ENDPOINT_URL || "http://aoi-nas:34275";

// Connection string for SQLite database
export const SQLITE_DB_CONNECTION = process.env.SQLITE_DB_CONNECTION || "sqlite://:memory:"; 