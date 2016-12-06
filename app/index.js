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
        user: window.user
    };
    return _this._data;
});

automationApp.run(['$location', 'Authentication', '$rootScope', function($location, Authentication, $rootScope) {

    $rootScope.testUrl = '/task/new';
    $rootScope.authentication = Authentication;

    $rootScope.$on('$locationChangeStart', function (event,newUrl,oldUrl) {
        if (!Authentication.user) {

            if ($location.path() === '/register') {
                $location.path('/register').replace();
            } else if ($location.path() !== '/login') {
                $rootScope.testUrl = $location.path();
                $location.path('/login').replace();
            }

        }
    });
}]);

