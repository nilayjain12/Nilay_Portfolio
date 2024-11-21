;(function () {
	
	'use strict';

	const isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	const fullHeight = function() {
		if (!isMobile.any()) {
			const setHeight = () => {
				$('.js-fullheight').css('height', $(window).height());
			};
			setHeight();
			// Debounce resize
			$(window).resize(debounce(setHeight, 200));
		}
	};

	// Debounce function
	const debounce = (func, delay) => {
		let inDebounce;
		return function() {
			const context = this, args = arguments;
			clearTimeout(inDebounce);
			inDebounce = setTimeout(() => func.apply(context, args), delay);
		};
	};

	// Parallax
	const parallax = function() {
		if ($.stellar) {
			$(window).stellar();
		} else {
			console.warn("Stellar plugin is missing.");
		}
	};

	const contentWayPoint = function() {
		let i = 0;
		$('.animate-box').waypoint(function(direction) {
			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function() {
					$('body .animate-box.item-animate').each(function(k) {
						const el = $(this);
						setTimeout(function() {
							const effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}
							el.removeClass('item-animate');
						}, k * 100, 'easeInOutExpo');
					});
				}, 50);
			}
		}, { offset: '85%' });
	};

	const goToTop = function() {
		$('.js-gotop').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 500, 'easeInOutExpo');
		});

		$(window).scroll(function() {
			const $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}
		});
	};

	const pieChart = function() {
		if ($.fn.easyPieChart) {
			$('.chart').easyPieChart({
				scaleColor: false,
				lineWidth: 4,
				lineCap: 'butt',
				barColor: '#FF9000',
				trackColor: "#f5f5f5",
				size: 160,
				animate: 1000
			});
		} else {
			console.warn("easyPieChart plugin is missing.");
		}
	};

	const skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0) {
			$('#fh5co-skills').waypoint(function(direction) {
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(pieChart, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	// Loading page
	const loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	$(function() {
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		skillsWayPoint();
	});

}());
