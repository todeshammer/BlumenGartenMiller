define([
	"helper/dom",
	"helper/util"
], function(dom, util) {
	var template = {
		xmlHttp: [],
		queue: [],
		cache: {},

		/**
		 * Fetch a template and append it.
		 * @param {String} path The path of the template
		 * @param {Object} optScope An optional scope to reference events to
		 * @param {Function} callback The callback with the template and a flag that determines whether the request was cached or not
		 */
		get: function get(path, optScope, callback) {
			var that = this,
				alreadyInQueue = false,
				i;

			// check whether template is already cached
			if (this.cache[path] && this.cache[path] !== "requested") {
				callback(this.getNewInstance(path, optScope));
				return;
			}

			// check whether template is already requested -> add to queue and append on arrival of template
			if (this.cache[path] === "requested") {
				// dont' add when already in queue
				for (i = 0; i < this.queue.length; i++) {
					if (this.queue[i].path === path && JSON.stringify(this.queue[i].optScope) === JSON.stringify(optScope) && JSON.stringify(this.queue[i].callback) === JSON.stringify(callback)) {
						return;
					}
				}

				this.queue.push({
					path: path,
					optScope: optScope,
					callback: callback
				});
				return;
			}

			// set to true until template arrives, in case it gets fired multiple times
			this.cache[path] = "requested";

			this.xmlHttp[path] = new XMLHttpRequest();

			this.xmlHttp[path].onreadystatechange = function onreadystatechange() {
				that.handleResponse(path, optScope, callback);
			};

			this.xmlHttp[path].open("GET", "html/" + path + ".html", true);
			this.xmlHttp[path].send(null);
		},

		/**
		 * Returns a new instance of the given template.
		 * @param {String} path The path of the template
		 * @param {Object} optScope The optScope to reference events to
		 * @return {Object} The parent-node of the template
		 */
		getNewInstance: function getNewInstance(path, optScope) {
			var div = document.createElement("div");

			div.className = "tpl-" + util.camelToDash(path);

			if (optScope) {
				div.innerHTML = this.resolveVariables(this.cache[path], optScope);
				this.addEventListeners(div, optScope);
			} else {
				div.innerHTML = this.cache[path];
			}

			return div;
		},

		/**
		 * Revolves variables-names marked with {{}} wihtin the string.
		 * @param {String} string The template as a string
		 * @param {Object} scope The optScope to resolve variables to
		 */
		resolveVariables: function resolveVariables(string, scope) {
			var i;

			for (i in scope) {
				string = string.split("{{" + i + "}}").join(scope[i]);
			}

			return string;
		},

		/*
		 * Adds event-listeners to all click-events in the template
		 * @param {Object} node The template's root-node
		 * @param {Object} scope The scope to append events to
		 */
		addEventListeners: function addEventListeners(node, scope) {
			var childNodes = node.getElementsByTagName('*'),
				func = [],
				i;

			for (i = 0; i < childNodes.length; i++) {
				(function(i){
					if (typeof childNodes[i].onclick === 'function') {
						// get function-body
						func[i] = childNodes[i].onclick.toString();
						func[i] = func[i].substring(func[i].indexOf("{") + 1, func[i].lastIndexOf("}"));
						func[i] = "scope." + func[i].replace(/\s/g,'');

						// specific dom-elements creating anonymous functions, we don't want to apply a scope to them
						if (func[i].indexOf("btnOn") === -1 || func[i].indexOf("optBtnOff") === -1) {
							childNodes[i].onclick = function() {
								// i know... eval is bad :(
								eval(func[i]);
							};
						}
					}
				}) (i);
			}
		},

		/*
		 * Handles the requestes response.
		 * @param {String} path The path of the template
		 * @param {Object} optScope The scope to reference events to
		 * @param {Function} callback The callback with the tempalte and a flag that this request wasn't cached
		 */
		handleResponse: function handleResponse(path, optScope, callback) {
			var tmpQueue = [],
				i;

			if (this.xmlHttp[path].readyState === 4 && this.xmlHttp[path].status === 200) {

				if (this.xmlHttp[path].responseText === "Not found") {
					console.warn("Cannot load template: " + path);
					return;
				}

				// cache template
				this.cache[path] = this.xmlHttp[path].responseText;

				// handle queued items
				for (i = 0; i < this.queue.length; i++) {
					this.queue[i].callback(this.getNewInstance(path, this.queue[i].optScope));
					this.queue[i] = null;
				}

				// cleanup queue
				for (i = 0; i < this.queue.length; i++) {
					if (this.queue[i]) {
						tmpQueue.push(this.queue[i]);
					}
				}
				this.queue = tmpQueue;

				callback(this.getNewInstance(path, optScope));
			}
		}

	};

	return template;
});
