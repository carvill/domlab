iter = function(data, c, prep) {
		var t, i;
		if (data['type'] === undefined || data['type'] === 'node') {
			t = d.createElement(data['tag']);
			if (data['class'] && data['class'].length > 0) {
				t.className = data['class'];
			}

			if (data['html']) {
				t.innerHTML = data['html'];
			} else if (data['text']) {
				t.appendChild(d.createTextNode(data['text']))
			}

			if (data['attr']) {
				for (i in data['attr']) {
					t.setAttribute(i, data['attr'][i]);
				}
			}

			// $.loop(data['events'], function(name, fn) {
			// 	$tag.on(name, fn);
			// });

			if (data['append'] && data['append'].length > 0) {
				for (i = 0; i < data['append'].length; i++) {
					iter(data['append'][i], t);
				}
			}

			if (data['prepend'] && data['prepend'].length > 0) {
				for (i = 0; i < data['prepend'].length; i++) {
					iter(data['prepend'][i], t, true);
				}
			}

			if (data['complement']) {
				data['complement'].call(t, []);
			}

			if (!data['remove_empty'] || t.childNodes.length > 0) {
				if (prep) {
					c.insertBefore(t, c.childNodes[0]);
				} else {
					c.appendChild(t);
				}

				// if (data['key']) {
				// 	st['push'](data['key'], $tag);
				// }
			}

		// } else if (data['type'] === 'iterator') {
		// 	data['datasource'](function(content) {
		// 		$.loop(content, function(k, v) {
		// 			$.addDom($cntnr, data['filler'](k, v), false, st);
		// 		});	
		// 	});
		}
	},
	domlab = function domlab(dom, c) {
		var t, tx, e, i, j, ap;
		for (i = 0; i < dom.length; i++) {
			e = dom[i];
			t = d.createElement(e.tag);

			if (e.text && e.text.length > 0) {
				t.appendChild(d.createTextNode(e.text));
			}

			if (e.append !== undefined) {
				domlab(e.append(), t);
			}
			c.appendChild(t);
		}
	},


var DL = function DL(t,tx,append) {
	this.tag = t;
	this.text = tx;
	this.append = append;
};





// iter({
		// 	'tag'    : 'div',
		// 	'class'  : 'test',
		// 	'attr'   : {
		// 		'at1' : 'uno',
		// 		'at2' : 'dos'
		// 	},
		// 	'append' : [
		// 		{
		// 			'tag' : 'h1',
		// 			'text': 'comencemos'
		// 		},
		// 		{
		// 			'tag' : 'h2',
		// 			'text': 'vas mano'
		// 		},
		// 		{
		// 			'tag' : 'h3',
		// 			'html': '<em>Esto es HTML</em>'
		// 		},
		// 		{
		// 			'tag' : 'a',
		// 			'text' : 'Enviar',
		// 			'prepend' : [
		// 				{
		// 					'tag' : 'i',
		// 					'class' : 'fa'
		// 				}
		// 			]
		// 		}
		// 	]
		// }, bdy);

		// var a = [];
		// a.push(new DL('h1', 'comencemos el desmadre'))
		// a.push(new DL('h1', 'comencemos el desmadre 2'))
		// a.push(new DL('div', '', function() {
		// 	return [
		// 		new DL('h2', 'Interno'),
		// 		new DL('h2', 'Interno 2')
		// 	];
		// }))
		// domlab(a, bdy);