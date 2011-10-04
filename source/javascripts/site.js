/* $: true, jslint white: true, maxerr: 50, indent: 4 */

$(function() {

	'use strict';
	
	// Variables
	var doc = this;
	
	if ($('html').hasClass('no-js')) {
		$('html').removeClass('no-js').addClass('js');
	}

	$('#bloom-box')
		.bloomBox({
			articles: '.article'
		});
});
