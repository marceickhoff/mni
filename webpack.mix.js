eval(require('./bin/util/generator')({
	srcStyle: 'docs/theme/src/scss/main.scss',
	destStyle: 'docs/theme/main.css',
	srcScript: 'docs/theme/src/js/main.js',
	destScript: 'docs/theme/main.js'
}));