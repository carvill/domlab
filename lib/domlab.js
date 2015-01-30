;
(function($) {

	$.domlab = function domlab(dom, opts) {
		var st = $.extend({
			'container' : $('<div/>'),
			'elmts' : {}
		}, opts);

		$.addDom(st['container'], dom, false, {
			'push' : function(key, $el) {
				st['elmts'][key] = $el;
			},
			'overide' : true
		});

		return {
			'elements' : st['elmts'],
			'container': st['container']
		};
	};

	$.addDom = function addDom($cntnr, data, prep, opts) {
		var st = $.extend({
			'push' : function(key, $el) {}
		}, opts);

		if (opts && opts['overide']) {
			st = $.extend({
				'push' : function(key, $el) {}
			}, opts);
			st['overide'] = false;
		} else {
			st = opts;
		}

		if (data['type'] === undefined || data['type'] === 'node') {
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

			$.appendDom($tag, data['append'], false, st);
			$.appendDom($tag, data['prepend'], true, st);

			if (data['complement']) {
				data['complement'].call($tag, []);
			}

			if (!data['remove_empty'] || $tag.children().length > 0) {
				if (prep) {
					$cntnr.prepend($tag);
				} else {
					$cntnr.append($tag);
				}

				if (data['key']) {
					st['push'](data['key'], $tag);
				}
			}
		} else if (data['type'] === 'iterator') {
			data['datasource'](function(content) {
				$.loop(content, function(k, v) {
					$.addDom($cntnr, data['filler'](k, v), false, st);
				});	
			});
		}
	};

	$.appendDom = function appendDom($container, items, prep, opts) {
		$.loop(items, function(index, d) {
			$.addDom($container, d, prep, opts);
		});
	};

	$.loop = function loop(object, callback) {
		if (typeof object === 'function') {
			$.each(object(), callback);
		} else if ($.isIterable(object)) {
			$.each(object, callback);
		}
	};

	$.isIterable = function isIterable(object) {
		return object !== undefined && (($.type(object === "array") && object.length > 0) || $.type(object === "object"));
	};

})(jQuery);