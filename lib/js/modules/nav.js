module.exports = {

	/**
	 * Selectors.
	 */
	selectors: {
		nav: ".nav", // Nav parent class
		navList: ".nav-list", // Nav parent class
		navItem: ".nav-item", // Nav parent class
		navToggle: ".nav-toggle" // Off-canvas toggle button (needs to be a descendant of nav)
	},

	/**
	 * State classes.
	 */
	states: {
		active: "active", // When the off-canvas nav is opened
		sticky: "sticky" // When the nav bar is attached to the top of the viewport
	},

	/**
	 * Initializer.
	 * Binds functions and event listeners to DOM elements.
	 */
	init: function () {

		// Local variables
		var nav = this;
		var sel = nav.selectors;

		// Select nodes
		document.querySelectorAll(sel.nav).forEach(function (el) {

			// Bind functions
			el.open = nav.open;
			el.close = nav.close;
			el.toggle = nav.toggle;
			el.stick = nav.stick;
			el.unstick = nav.unstick;
			el.isHorizontal = nav.isHorizontal;

			// Click event for toggle button.
			el.querySelector(sel.navToggle).addEventListener('click', function () {
				el.toggle();
			});

			// Close off-canvas nav on window resize.
			window.addEventListener('resize', function () {
				el.close();
			});

			// Sticky behaviour
			var initialOffset = el.offsetTop;
			if (el.hasAttribute('data-sticky')) {
				var sticky = function() {
					window.scrollY > initialOffset ? el.stick() : el.unstick();
				};
				sticky();
				window.addEventListener('scroll', sticky);
			}
		});

		return this;
	},

	/**
	 * Opens the off-canvas navigation.
	 */
	open: function () {
		this.classList.add(module.exports.states.active);
	},

	/**
	 * Closes the off-canvas navigation.
	 */
	close:  function () {
		this.classList.remove(module.exports.states.active);
	},

	/**
	 * Toggles the off-canvas navigation.
	 */
	toggle: function () {
		this.classList.toggle(module.exports.states.active);
	},

	/**
	 * Sticks the nav bar to the screen edge.
	 */
	stick: function () {
		this.classList.add(module.exports.states.sticky);
	},

	/**
	 * Detaches the nav bar from the screen edge.
	 */
	unstick: function () {
		this.classList.remove(module.exports.states.sticky);
	},

	/**
	 * Checks if the nav items are all on the same y-position.
	 * @return boolean
	 */
	isHorizontal: function () {
		var isHorizontalLayout = true;
		var lastOffset;
		this.querySelectorAll(module.exports.selectors.navItem).forEach(function (li) {
			if (typeof lastOffset === "undefined") lastOffset = li.offsetTop;
			else if (lastOffset !== li.offsetTop) {
				return isHorizontalLayout = false;
			}
		});
		return isHorizontalLayout;
	}
};