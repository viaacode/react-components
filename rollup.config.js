import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const getOutput = (path, root = 'dist') => {
	const formats = ['esm', 'cjs'];

	return formats.map((format) => ({
		dir: path ? `${root}/${path}/${format}` : `${root}/${format}`,
		format,
	}));
};

const getPlugins = ({ typescriptConfig }) => [
	postcss({
		extensions: ['.scss', '.css'],
		plugins: [autoprefixer()],
		minimize: true,
	}),
	typescript({ clean: true, check: true, ...typescriptConfig }),
	commonjs(),
	terser(),
];

const commonExternal = ['react', 'react-dom'];

const excludeV1 = {
	exclude: ['node_modules', 'src/v1'],
};
const includeV1 = {
	include: ['src/v1'],
};

export default [
	{
		input: ['src/index.ts'],
		output: getOutput(),
		plugins: getPlugins({ typescriptConfig: { tsconfigOverride: excludeV1 } }),
		external: commonExternal,
	},
	{
		input: ['src/v1/index.ts', 'src/v1/wysiwyg.ts'],
		output: getOutput('v1'),
		plugins: getPlugins({ typescriptConfig: { check: false, tsconfigOverride: includeV1 } }),
		external: [
			...commonExternal,
			'autosize',
			'braft-editor',
			'braft-extensions/dist/table.css',
			'braft-editor/dist/index.css',
			'braft-extensions/dist/table',
			'classnames',
			'date-fns',
			'date-fns/locale/nl',
			'react-datepicker',
			'react-datepicker/dist/react-datepicker.css',
			'marked',
			'moment',
			'moment/locale/nl-be',
			'raf',
			'react-range',
			'react-select',
			'react-select/creatable',
			'lodash-es',
			'@storybook/addon-actions',
			'react-perfect-scrollbar',
			'react-perfect-scrollbar/dist/css/styles.css',
			'react-popper',
		],
	},
];
