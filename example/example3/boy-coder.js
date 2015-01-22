;
(function($) {
	
	$.fn.boycoder = function() {
		var $this = $(this),
		arrow = function arrow(dir) {
			var txt = '';
			switch(dir) {
				case 'up':
					txt = 'moveUp();';
					break;
				case 'down':
					txt = 'moveDown();';
					break;
				case 'left':
					txt = 'moveLeft();';
					break;
				case 'right':
					txt = 'moveRight();';
					break;
			};

			$.domlab({
				'tag' : 'div',
				'class' : 'sht-itm',
				'attr' : {
					'dir' : dir
				},
				'append' : [
					{
						'tag' : 'i',
						'class' : ('fa fa-arrow-' + dir + ' icn')
					},
					{
						'tag' : 'span',
						'text' : txt
					},
					{
						'tag' : 'i',
						'class' : ('fa fa-times-circle close rg'),
						'events' : {
							'click' : function(e) {
								$(this).parent().remove();
							}
						}
					}
				]
			}, {
				'container' : $this.dom('sheet')
			});
		},
		run = function run() {
			if ($this.dom('sheet').children().length == 0) {
				alert('Haz click en los botones azules para generar las instrucciones que moverán el cuadro verde.');
				return;
			}

			var x = 0, y = 0, $elem, $cas;
			$this.dom('run-table').children().removeClass('current').removeClass('error').removeClass('complete');
			$.each($this.dom('sheet').children(), function(i, el) {
				$elem = $(el);
				$elem.removeClass('error');
				switch($elem.attr('dir')) {
					case 'up':
						--y;
						break;
					case 'down':
						++y;
						break;
					case 'left':
						--x;
						break;
					case 'right':
						++x;
						break;
				};

				$cas = $this.dom('run-table').find('div[x="' + x + '"][y="' + y + '"]').eq(0);
				if ($cas.length == 0) {
					$elem.addClass('error');
					alert('Has salido de los límites');
					return false;
				}

				if ($cas.hasClass('bussy')) {
					$cas.addClass('error');
					$elem.addClass('error');
					alert('Error de compilación');
					return false;
				} else if ($cas.hasClass('exit')) {
					$cas.addClass('complete');
					alert('Felicidades! Has llegado a la meta en ' + (i + 1) + ' movimientos');
					return false;
				} else {
					$cas.addClass('current');
				}
			});
		},
		board = {
			'tag' : 'div',
			'class' : 'c1 run',
			'key' : 'run-table',
			'append' : [
				{
					'type' : 'iterator',
					'datasource' : function(success) {
						var cntnt = [], l = 5, i = 0, j = 0, t = 0, itm = {};
						for (j = 0; j < l; j++) {
							for (i = 0; i < l; i++) {
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
		};
		
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
									'text' : 'Coloca el cuadro verde en el mismo lugar donde se encuentra actualmente el cuadro azul. Utiliza los botones azules para generar el código con el que lograrás llevar el cuadro verde a lugar donde está el azul.'
								},
								{
									'tag' : 'p',
									'text' : 'Evita que alguna de las instrucciones provoque que el cuadro verde salga de los límites o que intente ocupar el lugar de algún cuadro negro.'
								}
							]
						},
						{
							'tag' : 'div',
							'class' : 'c1 mtp',
							'append' : [
								{
									'tag' : 'div',
									'class' : 'c23',
									'append' : [
										{
											'tag' : 'h4',
											'text' : 'Tu código'
										},
										{
											'tag' : 'div',
											'class' : 'c1 mtb',
											'append' : [
												{
													'tag' : 'div',
													'class' : 'sheet',
													'key' : 'sheet'
												},
												{
													'tag' : 'div',
													'class' : 'c4',
													'append' : [
														$.button('Arriba', 'blue', 'fa-arrow-up', {
															'click' : function(e) {
																e.preventDefault();
																arrow('up');
															}
														}),
														$.button('Abajo', 'blue', 'fa-arrow-down', {
															'click' : function(e) {
																e.preventDefault();
																arrow('down');
															}
														}),
														$.button('Izquierda', 'blue', 'fa-arrow-left', {
															'click' : function(e) {
																e.preventDefault();
																arrow('left');
															}
														}),
														$.button('Derecha', 'blue', 'fa-arrow-right', {
															'click' : function(e) {
																e.preventDefault();
																arrow('right');
															}
														})
													]
												}
											]
										},
										{
											'tag' : 'div',
											'class' : 'c1',
											'append' : [
												$.button('Correr', '', 'fa-play', {
													'click' : function(e) {
														e.preventDefault();
														run();
													}
												}),
												$.button('Borrar', '', 'fa-eraser', {
													'click' : function(e) {
														e.preventDefault();
														$this.dom('sheet').empty();
													}
												}),
												$.button('Recargar reto', '', 'fa-refresh', {
													'click' : function(e) {
														e.preventDefault();
														$this.dom('sheet').empty();
														$this.repaint('run-table', board['append'], board['prepend']);
													}
												})
											]
										},
										{
											'tag' : 'div',
											'class' : 'c1 mtp',
											'append' : [
												{
													'tag' : 'h6',
													'html' : '<strong>Correr:</strong>&nbsp;ejecuta las instrucciones que has puesto en tu código'
												},
												{
													'tag' : 'h6',
													'html' : '<strong>Borrar:</strong>&nbsp;borra todas las instrucciones de tu código'
												},
												{
													'tag' : 'h6',
													'html' : '<strong>Recargar reto:</strong>&nbsp;para solicitar otra disposición de cuadros en el reto'
												}
											]
										}
									]
								},
								{
									'tag' : 'div',
									'class' : 'c3 rg',
									'append' : [
										{
											'tag' : 'h4',
											'text' : 'Comprueba el resultado'
										}, board
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