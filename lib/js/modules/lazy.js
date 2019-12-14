const LazyLoad = require("vanilla-lazyload/dist/lazyload");

module.exports = {

	/**
	 * Selectors.
	 */
	selectors: {
		container: ".lazy", // Container element
		element: ".lazy-media", // Media element
	},

	/**
	 * State classes.
	 */
	states: {
		loading: "loading", // When the image is loading
		loaded: "loaded", // When the image has finished loaded
		error: "loading" // When there was an error loading the image
	},

	/**
	 * Animated activity indicator.
	 */
	spinner: {
		type: "div", // Element type
		class: "spinner" // Element class
	},

	/**
	 * Keeping track of all LazyLoad instances.
	 */
	lazyLoadInstances: [],

	/**
	 * Initializer.
	 * Creates LazyLoad instances for images.
	 */
	init: function() {
		new LazyLoad({
			elements_selector: module.exports.selectors.container,
			class_loading: null,
			class_loaded: null,
			class_error: null,
			callback_enter: function(c) {
				var oneLL = new LazyLoad({
					use_native: false,
					container: c,
					elements_selector: module.exports.selectors.element,
					class_loading: module.exports.states.loading,
					class_loaded: module.exports.states.loaded,
					class_error: module.exports.states.error,
					callback_reveal: function (el) {
						var spinner = document.createElement(module.exports.spinner.type);
						spinner.classList.add(module.exports.spinner.class);
						el.after(spinner);
					},
					callback_loaded: function (el) {
						var s;
						while (s = el.nextSibling) {
							if (s.classList.contains(module.exports.spinner.class)) {
								s.remove();
								return;
							}
						}
					}
				});
				module.exports.lazyLoadInstances.push(oneLL);
			}
		});
	}
};