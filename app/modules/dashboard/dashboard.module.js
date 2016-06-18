
(function() {
  'use strict';

  var module = angular.module('automationApp.dashboard', [
    'ui.router',
	'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ]);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'modules/dashboard/dashboard.html',
        controller: 'DashboardController'
      })
  }
})();
