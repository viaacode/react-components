import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { visualizer } from 'rollup-plugin-visualizer';

const DEFAULT_PLUGINS_OVERRIDES = {
	typescriptConfig: {},
	visualizerConfig: {},
};

const getOutput = (path, root = 'dist') => {
	const formats = ['esm', 'cjs'];

	return formats.map((format) => ({
		dir: path ? `${root}/${path}/${format}` : `${root}/${format}`,
		format,
	}));
};

const getPlugins = ({ typescriptConfig = {}, visualizerConfig } = DEFAULT_PLUGINS_OVERRIDES) => [
	postcss({
		extensions: ['.scss', '.css'],
		plugins: [autoprefixer()],
		minimize: true,
	}),
	typescript({
		clean: true,
		check: true,
		tsconfig: './tsconfig.build.json',
		...typescriptConfig,
	}),
	nodeResolve(),
	commonjs(),
	terser(),
	visualizer({
		...visualizerConfig,
		filename: 'bundle-stats.html',
		title: '@meemoo/react-components | Rollup Visualizer',
	}),
];

const external = [
	'autosize',
	'clsx',
	'react',
	'react-dom',
	'react-popper',
	'react-select',
	'react-select/creatable',
	'react-table',
	'react-datepicker',
	'date-fns/locale',
];

// It's possible to pass custom cli arguments through rollup
// For more info: https://rollupjs.org/guide/en/#configuration-files
export default (cliArgs) => {
	return [
		{
			input: ['src/index.ts'],
			output: getOutput(),
			plugins: getPlugins({ visualizerConfig: { open: cliArgs['config-analyze'] } }),
			external,
		},
	];
};
