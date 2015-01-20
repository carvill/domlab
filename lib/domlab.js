;
(function($) {

	$.fn.domlab = function(dom, opts) {
		var st = $.extend({'debug' : false }, opts), $this = $(this).logger(st['debug']), elmts={};

		function add($cntnr, data, prep) {
			if (data['type'] === undefined || data['type'] === 'node') {
				$this.log('Processing tag ' + data['tag']);

				var $tag = $('<' + data['tag'] + '/>').addClass(data['class']);

				if (data['html'] !== undefined) {
					$tag.html(data['html']);
				} else if (data['text'] !== undefined) {
					$tag.text(data['text']);
				}

				$.loop(data['attr'], function(name, value) {
					$tag.attr(name, value);
				});

				$.loop(data['events'], function(name, fn) {
					$tag.on(name, fn);
				});

				$.loop(data['append'], function(index, d) {
					add($tag, d);
				});

				$.loop(data['prepend'], function(index, d) {
					add($tag, d, true);
				});

				if (!data['remove_empty'] || $tag.children().length > 0) {
					if (prep) {
						$cntnr.prepend($tag);
					} else {
						$cntnr.append($tag);
					}

					if (data['key']) {
						elmts[data['key']] = $cntnr;
					}
				}
			} else if (data['type'] === 'iterator') {
				data['datasource'](function(content) {
					$.loop(content, function(k, v) {
						add($cntnr, data['filler'](k, v));
					});	
				});
			}
		}

		add($this, dom);

		this.dom = function(key) {
			return elmts[key];
		};

		return this;
	};

	$.fn.logger = function(debug) {
		var enabled = debug && console !== undefined;
		this.log = function(message) {
			if (enabled) {
				console.log(message);
			}
		}
		return this;
	};

	$.loop = function(object, callback) {
		if ($.isIterable(object)) {
			$.each(object, callback);
		}
	};

	$.isIterable = function(object) {
		return object !== undefined && (($.type(object === "array") && object.length > 0) || $.type(object === "object"));
	};

})(jQuery);