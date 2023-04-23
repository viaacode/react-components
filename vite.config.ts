import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: '@viaa/avo2-components',
			fileName: 'index',
			formats: ['es'],
		},
		sourcemap: true,
	},
	plugins: [react(), viteTsconfigPaths(), dts(), externalizeDeps(), cssInjectedByJsPlugin()],
});
