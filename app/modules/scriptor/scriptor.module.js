(function() {
  'use strict';

  var module = angular.module('automationApp.scriptor', [
    'ui.router'
  ]);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.new', {
        url: '/new',
        templateUrl: 'modules/scriptor/newTask.html',
        controller: 'NewScriptController'
      })
  }
})();
