const Zooming = require("../../../node_modules/zooming/build/zooming");

module.exports = {
	/**
	 * Selectors.
	 */
	selectors: {
		image: ".zoomable", // Zoomable image
	},

	/**
	 * State classes.
	 */
	states: {
		active: "active", // Zoomable image
	},

	/**
	 * Initializer.
	 * Binds functions and event listeners to DOM elements.
	 */
	init: function () {
		document.addEventListener('DOMContentLoaded', function () {
			const zooming = new Zooming({
				onOpen: function (el) {
					el.classList.add(module.exports.states.active)
				},
				onClose: function (el) {
					el.classList.remove(module.exports.states.active)
				}
			});
			zooming.listen(module.exports.selectors.image)
		})
	}
};