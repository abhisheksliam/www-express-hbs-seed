(function() {
  'use strict';

  var module = angular.module('automationApp.core', [
    'ui.router'
  ]);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'modules/core/app.html',
        controller: 'AppController'
      });
	  
	  $urlRouterProvider.otherwise(function ($injector) {
          var $state = $injector.get('$state');
          $state.go('app');
      });
  }
})();
