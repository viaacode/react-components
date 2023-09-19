import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: '@meemoo/react-components',
			fileName: 'index',
			formats: ['es'],
		},
		sourcemap: true,
	},
	plugins: [
		react(),
		viteTsconfigPaths(),
		svgrPlugin(),
		dts(),
		externalizeDeps(),
		cssInjectedByJsPlugin(),
	],
	define: {
		// By default, Vite doesn't include shims for Node.js
		// necessary for rich text editor to work
		// https://github.com/vitejs/vite/discussions/5912#discussioncomment-5569850
		// TODO replace braft-editor at some point, since it is no longer maintained and neither is the underlying draftjs package
		global: 'globalThis',
	},
});
