import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import builtins from 'rollup-plugin-node-builtins';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { visualizer } from 'rollup-plugin-visualizer';

const FORMATS = ['esm', 'cjs'];
const OUTPUT_FOLDER = 'dist';

const getOutput = () => {
	return FORMATS.map((format) => ({
		dir: `${OUTPUT_FOLDER}/${format}`,
		format,
	}));
};

const getCopyDest = (pattern) => FORMATS.map((format) => `${OUTPUT_FOLDER}/${format}/${pattern}`);

// It's possible to pass custom cli arguments through rollup
// For more info: https://rollupjs.org/guide/en/#configuration-files
export default (cliArgs) => {
	return [
		{
			input: ['src/index.ts'],
			output: getOutput(),
			plugins: [
				builtins(),
				postcss({
					extensions: ['.scss', '.css'],
					plugins: [autoprefixer()],
					minimize: true,
				}),
				nodeResolve(),
				typescript({
					clean: true,
					check: true,
					tsconfig: './tsconfig.build.json',
				}),
				commonjs(),
				terser(),
				copy({
					targets: [{ src: 'src/types/*.d.ts', dest: getCopyDest('types') }], // Copy internal .d.ts files for all formats
				}),
				visualizer({
					filename: 'bundle-stats.html',
					open: cliArgs['config-analyze'],
					title: '@meemoo/react-components | Rollup Visualizer',
				}),
			],
			external: [
				'autosize',
				'clsx',
				'@popperjs/core',
				'date-fns',
				'lodash-es',
				'react-datepicker',
				'react-dom',
				'react-popper',
				'react-select',
				'react-select/creatable',
				'react-table',
				'react',
			],
		},
	];
};
