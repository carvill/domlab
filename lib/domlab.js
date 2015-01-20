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
						elmts[data['key']] = $tag;
						if (data['keep']) {
							if ($.isIterable(data['append'])) {
								$tag.data('append', data['append']);
							}
							if ($.isIterable(data['prepend'])) {
								$tag.data('prepend', data['prepend']);
							}
						}
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

		this.repaint = function(key) {
			var $cntnr = elmts[key];
			if ($cntnr !== undefined) {
				$this.log('Repainting tag with class "' + $cntnr.attr('class') + '"');
				$cntnr.empty();

				$.loop($cntnr.data('append'), function(index, d) {
					add($cntnr, d);
				});

				$.loop($cntnr.data('prepend'), function(index, d) {
					add($cntnr, d, true);
				});
			}
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
		if (typeof object === 'function') {
			$.each(object(), callback);
		} else if ($.isIterable(object)) {
			$.each(object, callback);
		}
	};

	$.isIterable = function(object) {
		return object !== undefined && (($.type(object === "array") && object.length > 0) || $.type(object === "object"));
	};

})(jQuery);