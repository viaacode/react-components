import {resolve} from 'node:path';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import svgrPlugin from 'vite-plugin-svgr';
import pkg from './package.json';

const peerDependencies: string[] = Object.keys(pkg.peerDependencies);

const external = [
	...peerDependencies,
	'react/jsx-runtime',
	'react/jsx-dev-runtime',
];

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: '@meemoo/react-components',
			fileName: (_, entryName) => {
				if (entryName === 'src/index') {
					return 'index.js';
				}
				return `${entryName}.js`;
			},
			formats: ['es'],
		},
		rollupOptions: {
			external,
			output: {
				preserveModules: true,
			},
		},
		sourcemap: true,
	},
	plugins: [
		react(),
		svgrPlugin(),
		dts(),
	],
	define: {
		// By default, Vite doesn't include shims for Node.js
		// necessary for rich text editor to work
		// https://github.com/vitejs/vite/discussions/5912#discussioncomment-5569850
		// TODO replace braft-editor at some point, since it is no longer maintained and neither is the underlying draftjs package
		global: 'globalThis',
	},
});
