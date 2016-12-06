'use strict';


(function() {

    var module = angular.module('automationApp.login', [
        'ui.router'
    ]);

    module.config(appConfig);

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'modules/login/views/user-login.html',
                controller: 'LoginController'
            })
            .state('register-user', {
                url: '/register',
                templateUrl: 'modules/login/views/user-signup.html',
                controller: 'LoginController'
            })
    }
})();
