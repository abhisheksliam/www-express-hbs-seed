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
      .state('task-new', {
        url: '/task/new',
        templateUrl: 'modules/scriptor/views/newTask.html',
        controller: 'NewScriptController'
      })
      .state('script-editor', {
          url: '/task/:id',
          templateUrl: 'modules/scriptor/views/displayScript.html',
          controller: 'ScriptEditorController'
      })
  }
})();
