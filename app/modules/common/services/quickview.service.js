'use strict';

angular.module('automationApp')
	.factory('quickViewService', ['applicationService', function(applicationService) {

		function quickviewSidebar() {

			function toggleqQuickview() {
				$('#quickview-toggle').click(function (e) {//
					e.preventDefault();
					e.stopPropagation();//
					if ($('#quickview-sidebar').hasClass('open'))
						$('#builder').removeClass('open');
					else
						$('#quickview-sidebar').addClass('open');
				});
			}

			/* Open / Close right sidebar */
			$('.main-content').on('click', '#scriptor-content', function (ev) {
				if (ev.target !== $('#quickview-sidebar')) {
					if ($('#quickview-sidebar').hasClass('open')) {
						$('#quickview-sidebar').addClass('closing');
						$('#quickview-sidebar').removeClass('open');
						setTimeout(function () {
							$('#quickview-sidebar').removeClass('closing');
						}, 400);
					}
				}
			});

			toggleqQuickview();
		}


		function quickviewHeight() {
			$('.chat-conversation').height('');
			var chatConversationHeight = $('.chat-conversation').height();
			var windowHeight = $(window).height();
			if (chatConversationHeight < windowHeight) {
				$('.chat-conversation').height($(window).height() - 50);
			}
		}

		/****  On Resize Functions  ****/
		$(window).resize(function () {
			quickviewHeight();
		});

		return {
			init: function () {
				quickviewSidebar();
				quickviewHeight();
			}
		}
	}]);