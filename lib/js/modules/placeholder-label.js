module.exports = {

	/**
	 * Selectors.
	 */
	selectors: {
		container: ".placeholder-label", // Container element
		label: ".label", // Label itself
		input: ".input", // Input field
	},

	/**
	 * State classes.
	 */
	states: {
		active: "active", // When the input field is focused or has a value
	},

	/**
	 * Initializer.
	 */
	init: function () {

		// Local variables
		let placeholderLabel = this;
		let sel = placeholderLabel.selectors;

		// Select nodes
		document.querySelectorAll(sel.container).forEach(function (el) {

			// Bind functions
			el.activate = placeholderLabel.activate;
			el.deactivate = placeholderLabel.deactivate;
			el.toggle = placeholderLabel.toggle;

			// Input field
			let input = el.querySelector(sel.input);

			// Click event for toggle button.
			input.addEventListener('focus', function () {
				el.activate();
			});

			input.addEventListener('blur', function () {
				if (!input.value) {
					el.deactivate();
				}
			});
		});
	},

	activate: function () {
		this.classList.add(module.exports.states.active);
	},

	deactivate: function () {
		this.classList.remove(module.exports.states.active);
	},

	toggle: function () {
		this.classList.toggle(module.exports.states.active);
	}
};