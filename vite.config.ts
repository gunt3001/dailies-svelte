import { sveltekit } from '@sveltejs/kit/vite';
import process from 'process';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
	// Pass through environment variables set in .env from Vite
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [sveltekit()],
		define: {
			'process.env.LEGACY_API_MODE': env.LEGACY_API_MODE,
			'process.env.LEGACY_API_ENDPOINT_URL': JSON.stringify(env.LEGACY_API_ENDPOINT_URL),
			'process.env.SQLITE_DB_CONNECTION': JSON.stringify(env.SQLITE_DB_CONNECTION),
		},
	};
});
