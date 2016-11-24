    'use strict';

	angular.module('automationApp.login')
		.controller('LoginController', ['$scope', '$rootScope', '$http', '$location',
		function($scope, $rootScope, $http, $location) {

            // If user is signed in then redirect to course
		    if ($scope.authentication.user && $location.path() === '/login')
                $location.path($rootScope.testUrl).replace();

            $scope.login = function () {

                $http.post('/api/login', $scope.credentials)
                    .success(function (response) {
                        $scope.authentication.user = response;
                        $rootScope.username = $rootScope.authentication.user.username;
                        $location.path($rootScope.testUrl).replace();
                    })
                    .error(function(err){
                        $scope.error = err.message;
		    });
        };

}]);
