const nav = require('mni/nav');

module.exports = {

	/**
	 * Selectors.
	 */
	selectors: {
		subnav: ".subnav" // Subnav container class
	},

	/**
	 * State classes.
	 */
	states: {
		active: "active" // When the subnav is opened
	},

	/**
	 * Initializer.
	 * Binds functions and event listeners to DOM elements.
	 */
	init: function () {

		// Local variables
		let subnav = this;
		let sel = subnav.selectors;

		// Select nodes
		document.querySelectorAll(sel.subnav).forEach(function (el) {

			// Bind functions
			el.isOpen = subnav.isOpen;
			el.open = subnav.open;
			el.close = subnav.close;
			el.toggle = subnav.toggle;
			el.hasHeightTransition = subnav.hasHeightTransition;

			// Get parent nav element
			let pNav = el;
			while ((pNav = pNav.parentElement) && !((pNav.matches || pNav.matchesSelector).call(pNav, nav.selectors.nav)));

			// Click event
			document.addEventListener("click", function (ev) {

				// Check if the target is inside a nav-list or a nav-list itself
				let targetIsNavList = ev.target === nav.selectors.navList;
				if (!targetIsNavList) {
					document.querySelectorAll(nav.selectors.navList).forEach(function (list) {
						if (list.contains(ev.target)) {
							return targetIsNavList = true;
						}
					});
				}

				// Close the subnav if target is not a nav-list or nav is horizontal
				if (el.isOpen() && (!targetIsNavList || pNav.isHorizontal())) {
					el.close();
				}

				// Otherwise, check if the target is the parent nav-item
				else if (el.parentElement === ev.target.parentElement) {
					el.toggle();
				}
			});

			// Resize event
			window.addEventListener("resize", function () {

				// Close on resize
				el.close();
			});
		});
	},

	/**
	 * Checks if the subnav is currently opened.
	 * @return boolean
	 */
	isOpen: function () {
		return this.classList.contains(module.exports.states.active);
	},

	/**
	 * Opens the subnav.
	 */
	open: function () {
		this.classList.add(module.exports.states.active);

		// This is kind of hacky but it allows for CSS transitions of implicit height by taking the calculated
		// height of the subnav and setting it explicitly.
		if (!this.hasHeightTransition()) return;// Only continue if there is a transition
		let height = this.offsetHeight + "px";
		let subnav = this;
		subnav.style.height = 0; // Start at 0...
		requestAnimationFrame(function () { // ...and in the next frame...
			subnav.style.height = height; // ...start transition to explicit height
		});
	},

	/**
	 * Closes the subnav.
	 */
	close: function () {
		this.classList.remove(module.exports.states.active);

		// Remove the explicit height again
		if (this.hasHeightTransition()) this.style.height = null;
	},

	/**
	 * Toggles the subnav.
	 */
	toggle: function () {
		this.isOpen() ? this.close() : this.open(); // Not using the native toggle method so we can use our own methods
	},

	/**
	 * Checks if the subnav has a transition of the height property.
	 * @return boolean
	 */
	hasHeightTransition: function() {
		let duration = getComputedStyle(this).transitionDuration;
		let property = getComputedStyle(this).transitionProperty;
		return duration !== "0s" && (property === "all" || property.indexOf("height") !== -1);
	}
};