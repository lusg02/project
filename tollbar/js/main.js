requirejs.config({
	paths: {
		jquery: 'jquery-1.11.1'
	}
});

requirejs(['jquery', 'backtop'], function ($, backtop) {

	$('#back-top').backtop({ // jQuery插件形式
		mode: 'move',
		pos: 1000,
		speed: 1000
	});
});

