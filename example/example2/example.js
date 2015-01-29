(function($) {

	$.fn.pxwebapp = function(opts) {
		var $bdy = $(this),
		sts = $.extend({}, opts),
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
								'attr': {'href':'/'},
								'text' : 'Logo',
								'key' : 'logo'
							},
							{
								'tag' : 'div',
								'class' : 'mnu',
								'append' : [
									{
										'tag' : 'a',
										'text': 'How it works',
										'attr': {'href':'#'}
									},
									{
										'tag' : 'a',
										'text': 'Documentation',
										'attr': {'href':'#'}
									},
									{
										'tag' : 'a',
										'text': 'Pricing',
										'attr': {'href':'#'}
									},
									{
										'tag' : 'a',
										'text': 'Sign in',
										'attr': {'href':'#'}
									}
								]
							}
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
					},
					{
						'tag' : 'div',
						'class' : 'bdyc',
						'append' : [
							{
								'tag' : 'div',
								'class' : 'vp',
								'append' : [
									{
										'tag' : 'div',
										'class' : 'c1',
										'append' : [
											{
												'tag' : 'div',
												'class' : 'c2',
												'append' : [
													{
														'tag' : 'h1',
														'class' : 'hght',
														'text' : 'WebApp with DOMLab'
													},
													{
														'tag' : 'p',
														'text' : 'Some very nice text explaining about benefits of this library.'
													}
												]
											},
											{
												'tag' : 'div',
												'class' : 'c3 rg',
												'append' : [
													{
														'tag' : 'h4',
														'class' : 'upper',
														'text' : 'Best DOM creation library'
													},
													{
														'tag' : 'p',
														'text' : 'Other text, whatever... In this moment that does not matters.'
													}
												]
											}
										]
									},
									{
										'tag' : 'div',
										'class' : 'c1',
										'append' : [
											{
												'type' : 'iterator',
												'datasource' : function(success) {
													success([1,2,3,4,5,6]);
												},
												'filler' : function(key, value) {
													return  {
														'tag' : ('h' + value),
														'text' : ('This is an H' + value + ' tag')
													}
												}
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				'tag' : 'div',
				'class' : 'ftr',
				'append' : [
					{
						'tag' : 'div',
						'class' : 'vp',
						'append' : [
							{
								'tag' : 'div',
								'class' : 'c3 lf',
								'append' : [
									{
										'tag' : 'h6',
										'text' : 'Legal'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'Term of service'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'Privacy policy'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'Acceptable use policy'
									}
								]
							},
							{
								'tag' : 'div',
								'class' : 'c3 md',
								'append' : [
									{
										'tag' : 'h6',
										'text' : 'Information'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'How it works'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'Documentation'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'Pricing'
									}
								]
							},
							{
								'tag' : 'div',
								'class' : 'c3 rg',
								'append' : [
									{
										'tag' : 'h6',
										'text' : 'Partners'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'github'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'jquery'
									},
									{
										'tag' : 'a',
										'attr' : {'href':'#'},
										'text' : 'spring.io'
									}
								]
							}
						]
					}
				]
			}
		]
	};

		$.domlab(dom, {
			'container' : $bdy
		});

	};


})(jQuery);