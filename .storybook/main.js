module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-jest',
		'storybook-addon-jsx',
		'@storybook/preset-scss',
	],
	framework: '@storybook/react',
	staticDirs: ['../static'],
	typescript: {
		check: false,
		checkOptions: {},
	},
};
