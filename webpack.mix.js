// General settings
eval(require('./bin/util/generator')({
	srcStyle: 'lib/scss/themes/_boilerplate.scss',
	destStyle: 'dist/css/main.css',
	srcScript: 'lib/js/main.js',
	destScript: 'dist/js/main.js'
}));

// Settings for documentation
eval(require('./bin/util/generator')({
	srcStyle: 'docs/theme/src/scss/main.scss',
	destStyle: 'docs/theme/main.css',
	srcScript: 'docs/theme/src/js/main.js',
	destScript: 'docs/theme/main.js'
}));