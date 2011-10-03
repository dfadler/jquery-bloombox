/* jQuery: true, jslint white: true, maxerr: 50, indent: 4 */

(function ($) {

	'use strict';

	$.fn.bloomBox = function (options) {

		// Variables
		var $box = this,
			boxHeight = $box.height(),
			boxWidth = $box.width();

		// Functions 
		function bloomIn() {

			$('.leftClone', $box).animate({
				'width': boxWidth / 2,
				'height': boxHeight,
				'marginLeft': -(boxWidth / 4),
				'marginTop': -(boxHeight / 2)
			},
			100, 'easeOutBack', function () {
				if ($box.hasClass('hovering')) {
					$('.left').animate({
						'opacity': 1
					},
					50);
				} else {
					$('.left').animate({
						'opacity': 0
					},
					50);
				}
			});

			$('.rightClone', $box).animate({
				'width': boxWidth / 2,
				'height': boxHeight,
				'marginRight': -(boxWidth / 4),
				'marginTop': -(boxHeight / 2)
			},
			200, 'easeOutBack', function () {
				if ($box.hasClass('hovering')) {
					$('.right').animate({
						'opacity': 1
					},
					100);
				} else {
					$('.right').animate({
						'opacity': 0
					},
					100);
				}
			});
		}



		function bloomOut() {
			$('.left').animate({
				'opacity': 0
			},
			100, function () {
				if ($box.hasClass('hovering')) {
					$('.leftClone', $box).animate({
						'width': boxWidth / 2,
						'height': boxHeight,
						'marginLeft': -(boxWidth / 4),
						'marginTop': -(boxHeight / 2)
					},
					200, 'easeOutBack');
				} else {
					$('.leftClone', $box).animate({
						'width': '0',
						'height': '0',
						'marginLeft': '0',
						'marginTop': '0'
					},
					200, 'easeInBack');
				}
			});

			$('.right').animate({
				'opacity': 0
			},
			100, function () {
				if ($box.hasClass('hovering')) {
					$('.rightClone', $box).animate({
						'width': boxWidth / 2,
						'height': boxHeight,
						'marginRight': -(boxWidth / 4),
						'marginTop': -(boxHeight / 2)
					},
					100, 'easeOutBack');
				} else {
					$('.rightClone', $box).animate({
						'width': '0',
						'height': '0',
						'marginRight': '0',
						'marginTop': '0'
					},
					100, 'easeInBack');
				}
			});
		}

		function bloom(event) {

			switch (event) {
			case 'mouseenter':
				$box.addClass('hovering');
				// console.log(event);
				break;
			case 'mouseleave':
				$box.removeClass('hovering');
				// console.log(event);
				break;
			case 'click':

				break;
			default:
				// console.log('default');
				break;

			}

			if ($box.hasClass('hovering')) {
				bloomIn();
			} else {
				bloomOut();
			}

		}

		return this.each(function () {
			// Setup
			$('.left', $box).clone(false).appendTo($box).removeAttr('class').addClass('leftClone').css({
				'width': '0',
				'height': '0',
				'marginLeft': '0',
				'marginTop': '0'
			}).children().remove();

			$('.right', $box).clone(false).appendTo($box).removeAttr('class').addClass('rightClone').css({
				'width': '0',
				'height': '0',
				'marginRight': '0',
				'marginTop': '0'
			}).children().remove();

			$('.left, .right').css({
				'opacity': 0
			});

			// Events
			$box.bind('mouseenter mouseleave click', function (e) {
				bloom(e.type);
			});
		});
	};
}(jQuery));
