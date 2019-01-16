define([
	"helper/dom",
	"helper/util",
	//"modules/net",
	"modules/slider",
	"modules/offers",
	"modules/template"
], function(dom, util, /*net, */slider, offers, template) {
	var SUB_STORE_PREFIX = 'store_',
		menu = {
			loaded: {},
			jumpToStore: function jumpToStore(store) {
				var OFFSET = 280,
					elem;

				if (!store) {
					return;
				}

				util.doWhen(function() {
					elem = dom.get('#' + SUB_STORE_PREFIX + store);

					return elem;
				}, function() {
					document.body.scrollTop = elem.offsetTop + OFFSET;
				});
			},
			open: function open(menu, optCallback) {
				var that = this,
					store,
					i;

				// selected specific store
				if (menu.indexOf(SUB_STORE_PREFIX) !== -1) {
					store = menu.substring(SUB_STORE_PREFIX.length, menu.length);
					menu = 'stores';
				}

				// set display none to all menus
				for (i in this.loaded) {
					dom.addClass("tpl-" + i, "display-none");
				}

				// check whether menu is already loaded
				if (this.loaded[menu]) {
					// display block to desired menu
					dom.removeClass("tpl-" + menu, "display-none");
					this.jumpToStore(store);
					return;
				}

				// append main html
				template.get(menu, this, function(node) {
					dom.append("content-inner", node);

					// set loaded
					that.loaded[menu] = true;

					if (optCallback) {
						optCallback();
					}

					that.jumpToStore(store);
				});
			},
			init: function init() {
				var that = this;

				// inet net
				//net.init();

				// append main html
				template.get("menu", this, function(node) {
					dom.append("main", node);

					that.open("home", function() {
						// init slider
						slider.init();

						// init offers
						offers.init();
					});
				});
			}
		};

	return menu;
});
