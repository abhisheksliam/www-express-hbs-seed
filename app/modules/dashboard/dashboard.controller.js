(function() {
  //'use strict';

	/**
 * @ngdoc function
 * @name newappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newappApp
 */
  angular.module('automationApp.dashboard')
    .controller('DashboardController', DashboardController);
	
  DashboardController.$inject = ['$scope', 'dashboardService', 'pluginsService'];
  function DashboardController($scope, dashboardService, pluginsService) {
	    
	  $scope.$on('$viewContentLoaded', function () {
      	dashboardService.init();
        pluginsService.init();
        dashboardService.setHeights()
        handleTodoList();
      });
      $scope.activeTab = true;
  }
})();

