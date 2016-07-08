/**
 * Created by Shipra
 */
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
        templateUrl: 'modules/scriptor/views/newTask.html',
        controller: 'NewScriptController'
      })
      .state('displayscript', {
          url: '/displayscript',
          templateUrl: 'modules/scriptor/views/displayScript.html',
          controller: 'NewScriptController'
      })
  }
})();
