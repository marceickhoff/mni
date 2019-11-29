// Laravel Mix
const mix = require('laravel-mix');

// Laravel Mix extensions
require('laravel-mix-clean-css');
require('laravel-mix-modernizr');

// Files
mix.sass('lib/scss/main.scss', 'dist');
mix.js('lib/js/main.js', 'dist');

// Additional PostCSS plugins
mix.options({
	postCss: [
		require('mqpacker')({ sort: true })
	]
});

// clean-css
mix.cleanCss({
	level: 2,
	format: mix.inProduction() ? false : 'beautify' // Beautify only in dev mode
});

// Modernizr
mix.modernizr();

// Public path for HMR mode
mix.setPublicPath('dist');