;
(function($) {
	
	$.fn.boycoder = function() {
		var $this = $(this);
		
		$this.webapp({
			'logo' : {
				'text' : 'Coder',
				'href' : '/'
			},
			'menu' : [
				{
					'tag' : 'a',
					'attr' : {'href' : '#'},
					'text' : 'Entrar'
				}
			],
			'ctnt' : [
				{
					'tag' : 'div',
					'class' : 'wdgt',
					'append' : [
						{
							'tag' : 'div',
							'class' : 'c1',
							'append' : [
								{
									'tag' : 'h1',
									'class' : 'hght',
									'text' : 'Aprendiendo a progamar'
								},
								{
									'tag' : 'p',
									'text' : 'Las instrucciones son simples, sólo coloca el cuadro verde en el mismo lugar donde se encuentra actualmente el cuadro azul. Para lograrlo deberás ingresar las instrucciones a seguir disponibles.'
								}
							]
						},
						{
							'tag' : 'div',
							'class' : 'c1 mtp',
							'append' : [
								{
									'tag' : 'div',
									'class' : 'c3',
									'append' : [
										{
											'tag' : 'h4',
											'text' : 'Tu código'
										},
										{
											'tag' : 'div',
											'class' : 'sheet',
											'key' : 'sheet'
										},
										{
											'tag' : 'div',
											'class' : 'c1',
											'append' : [
												{
													'tag' : 'a',
													'class' : 'button',
													'text' : 'Correr',
													'prepend' : [
														{
															'tag' : 'i',
															'class' : 'fa fa-play'
														}
													]
												},
												{
													'tag' : 'a',
													'class' : 'button',
													'text' : 'Borrar',
													'prepend' : [
														{
															'tag' : 'i',
															'class' : 'fa fa-eraser'
														}
													]
												}
											]
										}
									]
								},
								{
									'tag' : 'div',
									'class' : 'c2 rg',
									'append' : [
										{
											'tag' : 'h4',
											'text' : 'Comprueba el resultado'
										},
										{
											'tag' : 'div',
											'class' : 'c1 run',
											'key' : 'run-table',
											'keep' : true,
											'append' : [
												{
													'type' : 'iterator',
													'datasource' : function(success) {
														var cntnt = [], l = 5, i = 0, j = 0, t = 0, itm = {};
														for (i = 0; i < l; i++) {
															for (j = 0; j < l; j++) {
																itm = {
																	'x' : i,
																	'y' : j
																}
																if (i === 0 && j === 0) {
																	itm['start'] = true;
																} else if (i === 4 && j === 4) {
																	itm['exit'] = true;
																} else if (Math.floor((Math.random() * 10) + 1) < 4 && t < l) {
																	t++;
																	itm['free'] = false;
																} else {
																	itm['free'] = true;
																}
																cntnt.push(itm);
															}
														}
														success(cntnt);
													},
													'filler' : function(index, item) {
														var itm = {
															'tag' : 'div',
															'class' : 'box',
															'attr' : {
																'x' : item['x'],
																'y' : item['y']
															}
														};

														if (item['start']) {
															itm['class'] = itm['class'] + ' start';
														} else if (item['exit']) {
															itm['class'] = itm['class'] + ' exit';
														} else if (!item['free']) {
															itm['class'] = itm['class'] + ' bussy';
														}

														return itm;
													}
												}
											]
										},
										{
											'tag' : 'div',
											'class' : 'c1 mtp',
											'append' : [
												{
													'tag' : 'a',
													'class' : 'button',
													'text' : 'Recargar reto',
													'events' : {
														'click' : function(e) {
															e.preventDefault();
															$this.repaint('run-table');
														}
													},
													'prepend' : [
														{
															'tag' : 'i',
															'class' : 'fa fa-refresh'
														}
													]
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		});
	};

})(jQuery);