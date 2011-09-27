$(function(){
	
	'use strict';

	// Functions

	function BloomBox(obj) {
		this.obj = obj;
	}
	
	// Variables
	
	// var $this = this,
	var bloomBox = new BloomBox($('.box')),
		box = bloomBox.obj;

	$('.left', box)
		.clone(false)
		.appendTo(box)
		.removeAttr('class')
		.addClass('leftClone')
		.find('p')
		.remove();

	$('.right', box)
		.clone(false)
		.appendTo(box)
		.removeAttr('class')
		.addClass('rightClone')
		.find('img')
		.remove();
	
	$('.left p, .right img')
		.css({
			'opacity': 0
		});
	
		function bloomIn(event) {
			$('.leftClone', box)
				.animate({
					'width': '50%',
					'height': '100%',
					'marginLeft': '-25%',
					'marginTop': '-50%'
				}, 100, 'easeOutBack', function () {
					if (box.hasClass('hovering')) {
						$('.left p')
							.animate({
								'opacity': 1
							}, 50);	
					} else {
						$('.left p')
							.animate({
								'opacity': 0
							}, 50);
					}
				});
				
				$('.rightClone', box)
					.animate({
						'width': '50%',
						'height': '100%',
						'marginRight': '-25%',
						'marginTop': '-50%'
					}, 200, 'easeOutBack', function () {
						if (box.hasClass('hovering')) {
							$('.right img')
								.animate({
									'opacity': 1
								}, 100);	
						} else {
							$('.right img')
								.animate({
									'opacity': 0
								}, 100);
						}
					});
		}
		
		function bloomOut(event) {
			$('.left p')
				.animate({
					'opacity': 0
				}, 100, function () {
					if (box.hasClass('hovering')) {
						$('.leftClone', box)
							.animate({
								'width': '50%',
								'height': '100%',
								'marginLeft': '-25%',
								'marginTop': '-50%'
							}, 200, 'easeOutBack');
					} else {
						$('.leftClone', box)
							.animate({
								'width': '0%', 
								'height': '0%',
								'marginLeft': '0%',
								'marginTop': '0%'
							}, 200, 'easeInBack');
					}
				});
				
				$('.right img')
					.animate({
						'opacity': 0
					}, 100, function () {
						if (box.hasClass('hovering')) {
							$('.rightClone', box)
								.animate({
									'width': '50%',
									'height': '100%',
									'marginRight': '-25%',
									'marginTop': '-50%'
								}, 100, 'easeOutBack');
						} else {
							$('.rightClone', box)
								.animate({
									'width': '0%', 
									'height': '0%',
									'marginRight': '0%',
									'marginTop': '0%'
								}, 100, 'easeInBack');
						}
					});
		}
		
		function bloom(event) {
			
			switch (event) {
			case 'mouseenter':
				box
					.addClass('hovering');
				console.log(event);
				break;
			case 'mouseleave':
				box
					.removeClass('hovering');
				// bloomOut(event);
				console.log(event);
				break;
				
				default:
					console.log('default');
					break;
					
			}
			
			if (box.hasClass('hovering')) {
				bloomIn(event);
			} else {
				bloomOut(event);
			}
			
		}
		
	box
		.bind( 'mouseenter mouseleave',
			function (e) {
				bloom(e.type);	
			}
		);

});