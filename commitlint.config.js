module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-case': [
			2,
			'always',
			['upper-case', 'lower-case', 'camel-case', 'kebab-case', 'pascal-case'],
		],
		'subject-case': [2, 'never', ['start-case', 'pascal-case']],
		'body-max-length': [0],
	},
};
