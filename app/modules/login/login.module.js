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
                templateUrl: 'modules/login/views/user-login.html'
            })
    }
})();
