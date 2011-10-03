'use strict';

$(function(){
	
	if ($('html').hasClass('no-js')) {
		$('html')
			.removeClass('no-js')
			.addClass('js');
	}
	
	$('.box')
		.bloomBox();
});