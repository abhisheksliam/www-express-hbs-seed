(function() {
  'use strict';
  
	angular.module('automationApp')
	.directive('ngSpinnerLoader', ngSpinnerLoader);
	
	ngSpinnerLoader.$inject = ['$rootScope'];

	// Route State Load Spinner(used on page or content load)
	function ngSpinnerLoader($rootScope){
		return {
			link: function(scope, element, attrs) {
				// by defult hide the spinner bar
				element.addClass('hide'); // hide spinner bar by default
				// display the spinner bar whenever the route changes(the content part started loading)
				$rootScope.$on('$routeChangeStart', function() {
					element.removeClass('hide'); // show spinner bar
				});
				// hide the spinner bar on rounte change success(after the content loaded)
				$rootScope.$on('$routeChangeSuccess', function() {
					setTimeout(function(){
						element.addClass('hide'); // hide spinner bar
					},500);
					$("html, body").animate({
						scrollTop: 0
					}, 500);   
				});
			}
		};
	}

	
})();



