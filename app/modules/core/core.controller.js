(function() {
  //'use strict';

  angular.module('automationApp.core')
    .controller('AppController', AppController);
	
  AppController.$inject = ['$scope', 'applicationService', 'quickViewService', 'builderService', 'pluginsService', '$location'];
  function AppController($scope, applicationService, quickViewService, builderService, pluginsService, $location) {

	  $(document).ready(function () {
			applicationService.init();
			quickViewService.init();
		    builderService.init();
			pluginsService.init();
			Dropzone.autoDiscover = false;
		});

		$scope.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};
	  
  }

})();