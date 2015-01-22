(function($) {

	$.fn.webapp = function(opts) {
		var $bdy = $(this),
		sts = $.extend({
			'logo' : {
				'text' : '',
				'href' : '/'
			},
			'menu' : [],
			'ctnt' : []
		}, opts),
		menu = {
			'tag' : 'div',
			'class' : 'mnu',
			'append' : $.isIterable(sts['menu']) ? sts['menu'] : []
		},
		ctnt = {
			'tag' : 'div',
			'class' : 'bdyc',
			'append' : [
				{
					'tag' : 'div',
					'class' : 'vp',
					'append' : $.isIterable(sts['ctnt']) ? sts['ctnt'] : []
				}
			]
		},
		dom = {
			'tag' : 'div',
			'class' : 'cntn',
			'append' : [
				{
					'tag' : 'div',
					'class' : 'hdr',
					'append' : [
						{
							'tag' : 'div',
							'class' : 'vp',
							'append' : [
								{
									'tag' : 'a',
									'class' : 'logo',
									'attr': {'href' : sts['logo']['href']},
									'text' : sts['logo']['text'],
									'key' : 'logo'
								}, menu
							]
						}
					]
				},
				{
					'tag' : 'div',
					'class' : 'bdy',
					'append' : [
						{
							'tag' : 'div',
							'class' : 'bdyt'
						}, ctnt
					]
				},
				{
					'tag' : 'div',
					'class' : 'ftr',
					'append' : [
						{
							'tag' : 'div',
							'class' : 'vp'
						}
					]
				}
			]
		},
		elements = $.domlab(dom, {
			'container' : $bdy
		})['elements'];

		this.dom = function(key) {
			return elements[key];
		};

		this.repaint = function(key, append, prepend) {
			if (elements[key] !== undefined) {
				var cfg = {
					'push' : function callback(_key, $el) {
						elements[_key] = $el;
					},
					'overide' : true
				};

				elements[key].empty();
				$.appendDom(elements[key], append, false, cfg);
				$.appendDom(elements[key], prepend, false, cfg);
			}
		};

		return this;
	};

	$.button = function(text, clazz, icon, events) {
		return {
			'tag' : 'a',
			'class' : 'button ' + clazz,
			'text' : text,
			'prepend' : [
				{
					'tag' : 'i',
					'class' : ('fa ' + icon)
				}
			],
			'events' : events
		};
	};

})(jQuery);