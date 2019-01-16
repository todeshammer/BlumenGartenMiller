var express = require("express"),
	fs = require("fs"),
	http = require("http"),
	app = express(),
	server = http.createServer(app),
	io = require("socket.io").listen(server, {log: false}),
	stylus = require("stylus");

// config
app.use(express.cookieParser());
app.use(express.session({secret: "sdW§$_sdaw4Öxlfwer5xdf|@34"}));
app.use(stylus.middleware({src: __dirname + "/htdocs", compress: true, debug: true, force: true}));
app.use(express.static(__dirname + '/htdocs'));

server.listen(80);
console.log("Server started.");

/**
 * A user connected.
 * @param {Object} sockt The socket.io-object
 */
io.sockets.on('connection', function(socket) {
	/**
	 * Handles all emits via the server-loop.
	 * @param {string} func The name of the function
	 * @param {*} data The data to be transmitted
	 * @param {boolean} broadcast Indicates whether message is a broadcast
	 * @param {string} optTo The room where the message should be broadcasted to
	 */
	emit = function emit(func, data, broadcast, optTo) {
		var item,
			i;

		// sth sth serverloop here :D
		queue = [];
		queue.push({func: func, data: data, broadcast: broadcast, optTo: optTo});

		// sth sth divide into the 3 types here
		if (queue[0].broadcast) {
			if (queue[0].optTo) {
				socket.broadcast.to(queue[0].optTo).emit("packet", queue);
				return;
			}

			socket.broadcast.emit("packet", queue);
			return;
		}

		socket.emit("packet", queue);
	};

	// log
	console.log(socket.id + " connected.");

	// send initial stuff
	//emit("onConnect", { }, false);

	/**
	 * A user disconnected.
	 */
	/*socket.on('disconnect', function () {
		
	});*/

	socket.on("subscribeToNewsletter", function subscribeToNewsletter(email) {
		console.log(socket.id + " email:" + email + "subscribe to newsletter.");

		emit("onSubscribedToNewsletter", {
			'error': false
		}, false);
	});
});