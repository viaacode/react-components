module.exports = {
	extends: ['stylelint-config-standard-scss'],
	ignoreFiles: ['src/v1/**/*.(scss|sass|css)', 'src/styles/themes/avo2/**/*.(scss|sass|css)'],
	rules: {
		'selector-class-pattern': null,
		'no-descending-specificity': null,
	},
};
