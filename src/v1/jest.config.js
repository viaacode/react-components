module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	globals: {
		'ts-jest': {
			diagnostics: false,
		},
	},
	rootDir: './../../',
	setupFilesAfterEnv: ['<rootDir>/src/v1/setupTests.ts'],
	moduleNameMapper: {
		'^lodash-es$': '<rootDir>/node_modules/lodash/index.js',
		'\\.(jpg|jpeg|png|svg)$': '<rootDir>/jest/__mocks__/file-mock.js',
		'\\.(css|scss)$': '<rootDir>/jest/__mocks__/style-mock.js',
	},
	testEnvironment: 'jsdom',
	testMatch: [
		'<rootDir>/src/v1/**/__tests__/**/*.[jt]s?(x)',
		'<rootDir>/src/v1/**/?(*.)+(spec|test).[jt]s?(x)',
	],
};
