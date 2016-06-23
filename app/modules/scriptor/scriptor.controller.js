(function() {
  'use strict';

  angular.module('automationApp.scriptor')
    .controller('NewScriptController', NewScriptController);

  NewScriptController.$inject = ['$scope', 'pluginsService', 'applicationService', '$location'];
  function NewScriptController($scope, pluginsService, applicationService, $location) {
	  
	  /* Template Code to be kept in first route to be loaded */
	  $scope.$on('$viewContentLoaded', function () {
			pluginsService.init();
			applicationService.customScroll();
			applicationService.handlePanelAction();
			$('.nav.nav-sidebar .nav-active').removeClass('nav-active active');
			$('.nav.nav-sidebar .active:not(.nav-parent)').closest('.nav-parent').addClass('nav-active active');

			if($location.$$path == '/'){
				$('.nav.nav-sidebar .nav-parent').removeClass('nav-active active');
				$('.nav.nav-sidebar .nav-parent .children').removeClass('nav-active active');
				if ($('body').hasClass('sidebar-collapsed') && !$('body').hasClass('sidebar-hover')) return;
				if ($('body').hasClass('submenu-hover')) return;
				$('.nav.nav-sidebar .nav-parent .children').slideUp(200);
				$('.nav-sidebar .arrow').removeClass('active');
				$('body').addClass('dashboard');
			} else {
				$('body').removeClass('dashboard');
			}

	  });
  
  }


})();
