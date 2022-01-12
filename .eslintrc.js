module.exports = {
	env: {
		browser: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:storybook/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: false,
				},
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',

		'import/first': 'error',
		'import/no-duplicates': 'error',
		'import/no-named-as-default-member': 'off',
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
				},
				'newlines-between': 'always',
				pathGroups: [
					{
						pattern: '@{shared}/**',
						group: 'parent',
						position: 'before',
					},
				],
			},
		],

		'react/display-name': 'off',
		'react/self-closing-comp': 'warn',

		'sort-imports': [
			'warn',
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
			},
		],
	},
	overrides: [
		{
			files: ['src/v1/**/*.{js,jsx,ts,tsx}'],
			rules: {
				'jsx-a11y/click-events-have-key-events': 'off',
				'jsx-a11y/no-noninteractive-element-interactions': 'off',
				'jsx-a11y/no-static-element-interactions': 'off',
			},
		},
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
};
