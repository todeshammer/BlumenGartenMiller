define([
	"helper/dom",
	"modules/template",
	"helper/util"
], function(dom, template, util) {
	var offers = {
		curItem: 0,
		list: [{
			title:"Gummibaum",
			description: "Der Gummibaum (Ficus elastica) gehört zur Gattung der Feigen.",
			price: 24.5,
			img: "1.jpg"
		}, {
			title:"Wacholder",
			description: "Die Wacholder (Juniperus) gehören zur Unterfamilie Cupressoideae aus der Familie der Zypressengewächse.",
			price: 34,
			img: "2.jpg"
		}, {
			title:"Rose",
			description: "Die Rosen (Rosa) sind die gehören zur Pflanzengattung der Rosengewächse. Jende umfasst zwischen 100 und 250 Arten.",
			price: 12.5,
			img: "3.jpg"
		}, {
			title:"Bonsai",
			description: " Bonsai sind kleine Bäume in kleinen Gefäßen deren Sträucher zur Wuchsbegrenzung gestutzt werden.",
			price: 50,
			img: "4.jpg"
		}, {
			title:"Buchsbaum",
			description: "Der Buchsbaum ist eine Pflanzenart der Buchsbäume (Buxus). Er ist in Südwesteuropa, Mitteleuropa, Nordafrika und Westasien beheimatet.",
			price: 70,
			img: "5.jpg"
		}, {
			title:"Kumquat",
			description: "Kumquats (Fortunella) sind Pflanzen aus der Familie der Rautengewächse. Sie sind mit Zitruspflanzen verwandt.",
			price: 45,
			img: "6.jpg"
		}, {
			title:"Tulpe",
			description: "Die Tulpen (Tulipa) gehören zur Familie der Liliengewächse. Diese umfassen etwa 150 Arten.",
			price: 4,
			img: "7.jpg"
		}],
		init: function init() {
			var that = this,
				maxHeight = 142,
				itemWidth = 236,
				value = 0,
				offers = dom.get("offers"),
				inner,
				items,
				height,
				i;

			// append html
			for (i in this.list) {
				template.get("shopItem", this.list[i], function(node) {
					dom.append("offers", node);
				});
			}

			util.doWhen(function() {
				items = dom.get("offers").getElementsByTagName("li");

				return items.length > 0;
			}, function() {
				for (i = 0; i < items.length; i++) {
					inner = dom.get("inner", items[i]);
					height = inner.offsetHeight;

					if (height > maxHeight) {
						dom.removeClass(dom.get("more", items[i]), "display-none");
					}
				}
			});

			// prev
			dom.get("prev").onclick = function() {
				if (that.curItem === 0) {
					return;
				}

				if (that.curItem === 1) {
					dom.addClass("prev", "inactive");
				}
				dom.removeClass("next", "inactive");

				that.curItem--;
				value += itemWidth;
				offers.style.left = value + "px";
			};

			// next
			dom.get("next").onclick = function() {
				if (that.curItem === that.list.length - 4) {
					return;
				}

				if (that.curItem === that.list.length - 5) {
					dom.addClass("next", "inactive");
				}
				dom.removeClass("prev", "inactive");

				that.curItem++;
				value -= itemWidth;
				offers.style.left = value + "px";
			};
		}
	};

	return offers;
});