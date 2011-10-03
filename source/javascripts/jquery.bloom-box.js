(function ($) {

	'use strict';

	$.fn.bloomBox = function (options) {

		// Variables
		var $box = this,
			opts = $.extend({}, $.fn.bloomBox.defaults, options),
			articles = opts.articles ? $(opts.articles, $box): $box.children(),
			activeArticle = articles[0],
			boxHeight = $box.height(),
			boxWidth = $box.width();

		// Functions 

		function findActiveArticle() {
			$(articles)
				.each(function () { 
					if ($(this).hasClass('active')) {
						activeArticle = this;
					}
				});
				
			return activeArticle;
		}

		function bloomIn(e) {

			$('.leftClone', findActiveArticle()).animate({
				'opacity': 1,
				'width': boxWidth / 2,
				'height': boxHeight,
				'marginLeft': -(boxWidth / 4),
				'marginTop': -(boxHeight / 2)
			},
			100, e === 'click' ? 'jswing' : 'easeOutBack', function () {
				if ($box.hasClass('hovering')) {
					$('.left', findActiveArticle()).animate({
						'opacity': 1
					},
					50);
				} else {
					$('.left', findActiveArticle()).animate({
						'opacity': 0
					},
					50);
				}
			});

			$('.rightClone', findActiveArticle()).animate({
				'opacity': 1,
				'width': boxWidth / 2,
				'height': boxHeight,
				'marginRight': -(boxWidth / 4),
				'marginTop': -(boxHeight / 2)
			},
			200, e === 'click' ? 'jswing' : 'easeOutBack', function () {
				if ($box.hasClass('hovering')) {
					$('.right', findActiveArticle()).animate({
						'opacity': 1
					},
					100);
				} else {
					$('.right', $box).animate({
						'opacity': 0
					},
					100);
				}
			});
		}

		function bloomOut(e) {
			$('.left').animate({
				'opacity': 0
			},
			100, function () {
				if ($box.hasClass('hovering')) {
					$('.leftClone', $box).animate({
						'opacity': 1,
						'width': boxWidth / 2,
						'height': boxHeight,
						'marginLeft': -(boxWidth / 4),
						'marginTop': -(boxHeight / 2)
					},
					200, e === 'click' ? 'jswing' : 'easeOutBack');
				} else {
					$('.leftClone', $box).animate({
						'opacity': 0,
						'width': '0',
						'height': '0',
						'marginLeft': '0',
						'marginTop': '0'
					},
					200, e === 'click' ? 'jswing' : 'easeInBack');
				}
			});

			$('.right').animate({
				'opacity': 0
			},
			100, function () {
				if ($box.hasClass('hovering')) {
					$('.rightClone', $box).animate({
						'opacity': 1,
						'width': boxWidth / 2,
						'height': boxHeight,
						'marginRight': -(boxWidth / 4),
						'marginTop': -(boxHeight / 2)
					},
					100, e === 'click' ? 'jswing' : 'easeOutBack');
				} else {
					$('.rightClone', $box).animate({
						'opacity': 0,
						'width': '0',
						'height': '0',
						'marginRight': '0',
						'marginTop': '0'
					},
					100, e === 'click' ? 'jswing' : 'easeInBack');
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
				if ($(articles[articles.length - 1]).hasClass('active')) {
					
					$('.left, .right', findActiveArticle())
						.css({'opacity': 0})
						.parent()
						.removeClass('active');
						
					$('.left, .right', articles[0])
						.css({'opacity': 1})
						.parent()
						.addClass('active');

				} else {
					
					$('.left, .right', findActiveArticle())
						.css({'opacity': 0})
						.parent()
						.removeClass('active')
						.next()
						.addClass('active')
						.find('.left, .right')
						.css({'opacity': 1});
					
				}
					
				break;
			default:
				// console.log('default');
				break;

			}
			
			if ($box.hasClass('hovering')) {
				$(':animated').stop(true);
				bloomIn(event);
			} else {
				$(':animated').stop(true);
				bloomOut(event);
			}

		}

		return this.each(function () {
			
			// Setup
			$(articles)
				.each(function () {
					
					$('.left', this).clone(false).appendTo(this).removeAttr('class').addClass('leftClone').css({
						'width': '0',
						'height': '0',
						'marginLeft': '0',
						'marginTop': '0'
					}).children().remove();

					$('.right', this).clone(false).appendTo(this).removeAttr('class').addClass('rightClone').css({
						'width': '0',
						'height': '0',
						'marginRight': '0',
						'marginTop': '0'
					}).children().remove();

					$('.left, .right').css({
						'opacity': 0
					});
				}).filter(':eq(0)').addClass('active');

			// Events
			$box.bind('mouseenter mouseleave click', function (e) {
				bloom(e.type);
			});

			
		});	
	};
	
	$.fn.bloomBox.defaults = {
		articles: '.article',
		autoplay: false,
		controls: true,
		loop: false,
		speed: 200
	};
	
})(jQuery);