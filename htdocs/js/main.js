require.config({
	baseUrl: "js"/*,
	paths: {
		socketio: '../socket.io/socket.io',
	},
	shim: {
		socketio: {
			exports: 'io'
		}
	}*/
});

require([
	"helper/dom",
	"modules/template",
	"modules/menu"
], function(dom, template, menu) {
	// append header
	template.get("header", menu, function(node) {
		dom.append("header", node);
	});

	// append footer
	template.get("footer", menu, function(node) {
		dom.append("footer", node);

		window.onresize();
	});

	// init menu
	menu.init();

	// resize-listener
	window.onresize = function onresize() {
		// set footer small/big
		if (window.innerWidth < 1500) {
			dom.removeClass("info-small", "display-none");
			dom.addClass("info-big", "display-none");
		} else {
			dom.addClass("info-small", "display-none");
			dom.removeClass("info-big", "display-none");
		}
	};
});