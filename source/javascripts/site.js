$(function() {

	'use strict';

	if ($('html').hasClass('no-js')) {
		$('html').removeClass('no-js').addClass('js');
	}

	$('.box').bloomBox();
});
