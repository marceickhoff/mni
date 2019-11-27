const mix = require('laravel-mix');
const mixClean = require('./util/mix-clean');
mix
	.options({
		postCss: mix.inProduction() ? [
			require('autoprefixer'),
			require('mqpacker')({ sort: true })
		] : []
	})
	.webpackConfig({
		module: {
			rules: [
				{
					test: /\.modernizrrc\.js$/,
					enforce: "post",
					loader: "webpack-modernizr-loader"
				}
			]
		}
	})
	.sass('lib/scss/main.scss', 'dist')
	.js('lib/js/main.js', 'dist')
	.then(mixClean)
	.setPublicPath('dist');

if (mix.inProduction()) {
	mix.version();
}