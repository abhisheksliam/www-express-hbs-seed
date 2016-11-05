'use strict';

angular.module('automationApp.users')
	.controller('UserProfileController', ['$stateParams', '$rootScope', '$scope', 'usersService',
		function($stateParams, $rootScope, $scope, usersService) {

			$rootScope.runnerIcon = false;

			usersService.getUserDetails($stateParams.username).then(function (res) {
				$scope.user = res.data;
			});

			$scope.updateUser = function(){
				usersService.updateUserDetails($scope.user);
			}

		}]);
