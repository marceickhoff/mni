const Modernizr = require("../../../.modernizrrc.js");

module.exports = {
	init: function () {
		// Some browsers (*cough* IE) mess up the box model when it comes to flex-basis and padding/borders.
		// An element inside a flex container with flex-basis: 50% and box-sizing: border-box should span exactly
		// 50% of its parent's width INCLUDING borders and padding. Mentioned browsers don't behave like that and
		// only add borders and padding AFTER the 50% have been calculated, resulting in a total width of over 50%,
		// which can screw up your layout. This erroneous behaviour is not covered by existing Modernizr tests.
		Modernizr.testStyles(
			"#modernizr {" +
				"display: flex;" +
				"width: 10px" + // Width of the flex container (10px = 100%)
			"}" +
			"#modernizr > div {" +
				"box-sizing: border-box;" + // Instructs the browser to include borders and padding...
				"padding: 1px; border: 1px solid transparent;" + // ...so this shouldn't affect the width...
				"flex-basis: 50%;" + // ...so this should result in a total width of 5px, right?
			"}",
			function() {
				// element.offsetWidth includes padding and border, so it should be equal to 5px
				Modernizr.addTest("flexbox-sizing", document.getElementById("modernizr1").offsetWidth === 5);
			}, 2);
	}
};