const Zooming = require("../../../node_modules/zooming/build/zooming");

module.exports = {
	/**
	 * Selectors.
	 */
	selectors: {
		image: ".zoomable", // Zoomable image
	},

	/**
	 * Initializer.
	 * Binds functions and event listeners to DOM elements.
	 */
	init: function () {
		document.addEventListener('DOMContentLoaded', function () {
			let spinner;
			const zooming = new Zooming({
				onImageLoading: function () {
					spinner = document.createElement("div");
					spinner.classList.add("spinner");
					document.body.after(spinner);
					console.log("loading");
				},
				onImageLoaded: function () {
					document.body.removeChild(spinner);
					console.log("loaded");
				}
			});

			zooming.listen(module.exports.selectors.image)
		})
	}
};