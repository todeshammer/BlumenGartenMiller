define([
], function() {
	/*
	 * Utilies.
	 */
	var util = {
		/*
		 * Creates a two-dimensional array
		 * @param {Number} cols The amount of columns
		 * @param {Number} rows The amount of rows
		 * @return {Array} The two-dimensional array
		 */
		array2d: function array2d(cols, rows) {
			var array = new Array(cols),
				x,
				y;

			// create second array
			for (i = 0; i < cols; i++) {
				array[i] = new Array(rows);
			}

			// set content of each cell to null
			for (x = 0; x < cols; x++) {
				for (y = 0; y < rows; y++) {
					array[x][y] = null;
				}
			}

			return array;
		},

		/*
		 * Creates a random hex-color
		 * @return {Number} The hex-color
		 */
		randHexColor: function randHexColor() {
			return Math.floor(Math.random() * 16777215).toString(16);
		},

		/*
		 * Creates a random rgb-color
		 * @return {String} The rgb-color-sring
		 */
		randColor: function randColor() {
			var r = ~~(Math.random() * (255 - 20 + 1)) + 20,
				g = ~~(Math.random() * (255 - 20 + 1)) + 20,
				b = ~~(Math.random() * (255 - 20 + 1)) + 20;

			return "rgb(" + r + "," +  g + "," + b + ")";
		},

		/*
		 * Adds a zero to one digit numbers.
		 * @param {Number} n The number to be checked.
		 * @return {String} The padded number as a string.
		 */
		pad: function pad(n) {
			if (n < 10) {
				return "0" + n;
			}
			else {
				return n.toString();
			}
		},

		/*
		 * Make first char capital
		 * @return {String} The formatted string
		 */
		capitalLetter: function capitalLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},

		/*
		 * Converts camel-case to dashes.
		 * @param {String} string The string to be converted.
		 * @return {String} The converted string.
		 */
		camelToDash: function camelToDash(string) {
			return string.replace(/([A-Z])/g, function(i) {
				return "-"+ i.toLowerCase();
			});
		},

		/*
		 * Executes the callback when the given conditioon returns true.
		 * @param {Function} condition The function to be evaluated
		 * @param {Function} callback The callback to be executed when the condition returns true
		 */
		doWhen: function doWhen(condition, callback) {
			if (condition()) {
				callback();
			} else {
				setTimeout(function() {
					doWhen(condition, callback);
				}, 20);
			}
		}
	};

	return util;
});