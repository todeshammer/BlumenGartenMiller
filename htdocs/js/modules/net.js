define([
	"socketio"
], function(io) {
	/**
	 * Logs received messages.
	 * @param {*} param1 First parameter
	 * @param {*} param2 Second parameter
	 */
	var log = function log(param1, param2) {
			if (config.debug) {
				console.log("%c NET ", 'background: #000; color: #bada55', param1, param2);
			}
		},
		net = {
			socket: null,

			/**
			 * Subscribe to newsletter.
			 * @param {string} email The email adress
			 */
			subscribeToNewsletter: function subscribeToNewsletter(email) {
				this.socket.emit("subscribeToNewsletter", email);
			},

			/**
			 * A user connected.
			 */
			/*onConnect: function onConnect(data, callback) {
				
			},*/

			/**
			 * Reacts on newsletter-subsription
			 */
			onSubscribedToNewsletter: function onSubscribedToNewsletter(data) {
				console.log(data);
			},

			/**
			 * Initializes the module.
			 */
			init: function init(callback) {
				var that = this;

				// connect
				this.socket = io.connect("/");

				/**
				 * A packet arrived.
				 * @param {Array} data Containing function-name and data
				 */
				this.socket.on("packet", function packet(data) {
					var i;

					// resolve packet
					for (i = 0; i < data.length; i++) {
						log(data[i].func, data[i].data);
						that[data[i].func](data[i].data, callback);
					}
				});

				// make global
				window.net = this;
			}
		};

	return net;
});
