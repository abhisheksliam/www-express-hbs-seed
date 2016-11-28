'use strict';

/**
 * @ngdoc overview
 * @name newappApp
 * @description
 * # newappApp
 *
 * Main module of the application.
 */
var automationApp = angular.module('automationApp', [
'automationApp.core',
'automationApp.login',
'automationApp.sidebar',
'automationApp.scriptor',
'automationApp.runner',
'automationApp.users'
]);

automationApp.service('Authentication', function() {
    var _this = this;
    _this._data = {
        user: window.username
    };
    return _this._data;
});

automationApp.run(['$location', 'Authentication', '$rootScope', function($location, Authentication, $rootScope) {

    $rootScope.testUrl = '/task/new';
    $rootScope.authentication = Authentication;

    $rootScope.$on('$locationChangeStart', function (event,newUrl,oldUrl) {
        if (!Authentication.user && $location.path() !== '/login') {
            console.log("Inside if Block");
            $rootScope.testUrl = $location.path();
            $location.path('/login').replace();
        }
    });
}]);

