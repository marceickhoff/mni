eval(require('./bin/util/generator')({
	publicPath: 'docs',
	srcStyle: 'lib/scss/main.scss',
	destStyle: 'docs/assets/css/main.css',
	srcScript: 'lib/js/main.js',
	destScript: 'docs/assets/js/main.js'
}));