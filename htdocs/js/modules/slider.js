define([
	"helper/dom",
	"helper/util"
], function(dom, util) {
	var slider = {
		curSlide: 1,
		init: function init() {
			var elemEven,
				elemUneven,
				even,
				elem;

			util.doWhen(function() {
				elemEven = dom.get("#slide-even");
				elemUneven = dom.get("#slide-uneven");

				return elemEven && elemUneven;
			}, function() {
				if (slider.curSlide % 2 === 0){
					elemEven.className = "opacity-on";
					elemUneven.className = "opacity-off";
					elem = elemEven;
				} else {
					elemEven.className = "opacity-off";
					elemUneven.className = "opacity-on";
					elem = elemUneven;
				}

				// set src
				elem.src = "/img/slider/" + slider.curSlide + ".jpg";

				// increment
				slider.curSlide++;

				// reset on last image
				if (slider.curSlide > 6) {
					slider.curSlide = 1;
				}

				// set next slide
				setTimeout(init, 7000);
			});
		}
	};

	return slider;
});