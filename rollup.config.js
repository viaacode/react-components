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

const getPlugins = ({ typescriptConfig = {} } = {}) => [
	postcss({
		extensions: ['.scss', '.css'],
		plugins: [autoprefixer()],
		minimize: true,
	}),
	typescript({ clean: true, check: true, ...typescriptConfig }),
	commonjs(),
	terser(),
];

const external = [
	'autosize',
	'clsx',
	'react',
	'react-dom',
	'react-popper',
	'react-select',
	'react-select/creatable',
];

export default [
	{
		input: ['src/index.ts'],
		output: getOutput(),
		plugins: getPlugins(),
		external,
	},
];
