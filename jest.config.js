module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	setupFilesAfterEnv: [
		'<rootDir>/jest/jest.setup.js',
		'<rootDir>/static/flowplayer/flowplayer.min.js',
		'<rootDir>/static/flowplayer/plugins/speed.min.js',
		'<rootDir>/static/flowplayer/plugins/chromecast.min.js',
		'<rootDir>/static/flowplayer/plugins/airplay.min.js',
		'<rootDir>/static/flowplayer/plugins/subtitles.min.js',
		'<rootDir>/static/flowplayer/plugins/hls.min.js',
		'<rootDir>/static/flowplayer/plugins/cuepoints.min.js',
		'<rootDir>/static/flowplayer/plugins/google-analytics.min.js',
	],
	moduleNameMapper: {
		/* Handle CSS imports (with CSS modules)
		https://jestjs.io/docs/webpack#mocking-css-modules */
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/jest/__mocks__/style-mock.js',

		/* Handle image imports
		https://jestjs.io/docs/webpack#handling-static-assets */
		'^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/jest/__mocks__/file-mock.js',

		/* Handle deps */
		'^lodash-es$': '<rootDir>/node_modules/lodash/index.js',
	},
	roots: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
};
