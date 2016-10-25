/**
 * Created by Shipra
 */
(function() {
  'use strict';

  var module = angular.module('automationApp.users', [
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
      .state('app.user-profile', {
          url: '/users/:username',
          templateUrl: 'modules/users/views/manageProfile.html',
          controller: 'UserProfileController'
      })
  }
})();
