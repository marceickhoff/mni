eval(require('./bin/util/generator')({
	srcStyle: 'lib/scss/themes/_boilerplate.scss',
	destStyle: 'dist/css/main.css',
	srcScript: 'lib/js/main.js',
	destScript: 'dist/js/main.js'
}));