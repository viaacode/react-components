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
			input: [
				// Global
				'src/index.ts',

				// Groups
				// 'src/components/index.ts',
				// 'src/hooks/index.ts',
				// 'src/utils/index.ts',
				// 'src/types/index.ts',

				// Components
				'src/components/Avatar/index.ts',
				'src/components/Badge/index.ts',
				'src/components/Box/index.ts',
				'src/components/Button/index.ts',
				'src/components/Card/index.ts',
				'src/components/Checkbox/index.ts',
				'src/components/ColorPicker/index.ts',
				'src/components/ContentInput/index.ts',
				'src/components/Datepicker/index.ts',
				'src/components/Dropdown/index.ts',
				'src/components/Flex/index.ts',
				'src/components/FlowPlayer/index.ts',
				'src/components/FormControl/index.ts',
				'src/components/Menu/index.ts',
				'src/components/Modal/index.ts',
				'src/components/Pagination/index.ts',
				'src/components/RadioButton/index.ts',
				'src/components/RichTextEditor/index.ts',
				'src/components/Select/index.ts',
				'src/components/Table/index.ts',
				'src/components/Tabs/index.ts',
				'src/components/TagList/index.ts',
				'src/components/TagsInput/index.ts',
				'src/components/TextArea/index.ts',
				'src/components/TextInput/index.ts',
				'src/components/Timepicker/index.ts',

				// Hooks
				'src/hooks/use-callback-ref/index.ts',
				'src/hooks/use-click-outside/index.ts',
				'src/hooks/use-key-press/index.ts',
				'src/hooks/use-slot/index.ts',

				// Utils
				'src/utils/bem-class/index.ts',
				'src/utils/hash-string/index.ts',
				'src/utils/key-up/index.ts',
				'src/utils/merge-refs/index.ts',
				'src/utils/variant-classes/index.ts',
			],
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
