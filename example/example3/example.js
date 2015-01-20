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
			};

		$bdy.domlab(dom);

		this.dom = function(key) {
			return $bdy.dom(key);
		};

		this.repaint = function(key) {
			$bdy.repaint(key);
		};

		return this;
	};


})(jQuery);