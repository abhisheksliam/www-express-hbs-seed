(function() {
  'use strict';

  var module = angular.module('automationApp.scriptor', [
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
      .state('new', {
        url: '/new',
        templateUrl: 'modules/scriptor/newTask.html',
        controller: 'NewScriptController'
      })
      .state('displayscript', {
          url: '/displayscript',
          templateUrl: 'modules/scriptor/displayScript.html',
          controller: 'NewScriptController'
      })
  }
})();
