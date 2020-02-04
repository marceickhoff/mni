module.exports = mni = {
	modernizr: require('./modules/modernizr.js').init(),
	nav: require('./modules/nav.js').init(),
	subnav: require('./modules/subnav.js').init(),
	lazy: require('./modules/lazy.js').init(),
	lightbox: require('./modules/lightbox.js').init(),
	placeholderLabel: require('./modules/placeholder-label.js').init()
};