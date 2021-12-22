import autoprefixer from 'autoprefixer';
import cjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
	input: ['src/index.ts', 'src/v1/index.ts', 'src/v1/wysiwyg.ts'],
	output: [
		{
			dir: 'dist/esm',
			format: 'esm',
		},
		{
			dir: 'dist/cjs',
			format: 'cjs',
		},
	],
	plugins: [
		postcss({
			extensions: ['.scss', '.css'],
			plugins: [autoprefixer()],
			minimize: true,
		}),
		typescript({
			clean: true,
		}),
		cjs(),
		terser(),
	],
	external: [
		// Suppresses warnings about external dependencies
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
		'react',
		'react-dom',
		'react-range',
		'react-select',
		'react-select/creatable',
		'lodash-es',
		'@storybook/addon-actions',
		'react-perfect-scrollbar',
		'react-perfect-scrollbar/dist/css/styles.css',
		'react-popper',
	],
};
