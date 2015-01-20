(function($) {
	
	$.fn.paint = function() {
		var $this = $(this);
		var dom = {
			'tag' : 'div',
			'class' : 'users',
			'append' : [
				{
					'type' : 'node', // node is default
					'tag'  : 'h1',
					'text' : 'Lista de usuarios'
				},
				{
					'tag' : 'ol',
					'class' : 'user',
					'append' : [
						{
							'type'     : 'iterator',
							'datasource' : function(success) {
								var data = JSON.parse('{"users":[{"name":"Carlos","dob":"1987-04-09"},{"name":"Beto","dob":"1988-04-29","hobbies":{"FT":"Futbol","TR":"Toros"}}]}');
								success(data['users']);
							},
							'filler' : function(index, user) {
								return {
									'tag'    : 'li',
									'append' : [
										{
											'tag'  : 'strong',
											'text' : user['name']
										},
										{
											'tag'  : 'span',
											'text' : user['dob']
										},
										{
											'tag' : 'ul',
											'class' : 'hobbie',
											'remove_empty' : true, // removes parent when ds is empty
											'append' : [
												{
													'type' : 'iterator',
													'datasource' : function(success) {
														success(user['hobbies']);
													},
													'filler' : function(key, value) {
														return {
															'tag' : 'li',
															'attr': {
																'hb-code' : key
															},
															'text': value,
															'append' : [
																{
																	'tag'  : 'a',
																	'text' : '[details]',
																	'attr' : {
																		'href' : '#'
																	},
																	'events' : {
																		'click' : function(event) {
																			event.preventDefault();
																			alert('Details about ' + value);
																		}
																	}
																}
															]
														}
													}
												}
											]
										}
									]
								};
							}
						}
					]
				},
				{
					'tag' : 'a',
					'class' : 'button',
					'text' : 'Continuar',
					'prepend' : [
						{
							'tag' : 'i',
							'text': '-'
						}
					],
					'events' : {
						'click' : function(event) {
							event.preventDefault();
							alert('Do something');
						}
					}
				}
			]
		};

		$this.domlab(dom, {
			'debug' : false
		});

		return this;
	};
	
})(jQuery);