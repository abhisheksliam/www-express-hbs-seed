/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.login')
	.controller('LoginController', ['$timeout', '$scope', '$rootScope', '$http', '$location',
	function($timeout, $scope, $rootScope, $http, $location) {

        $scope.credentials = {
            'username' : undefined,
            'password' : undefined
        };

        $scope.gplus = {
            'id_token' : undefined
        };

        // If user is signed in then redirect to course
        if ($scope.authentication.user && $location.path() === '/login')
            $location.path($rootScope.testUrl).replace();

        if($location.path() === '/register') {
            $rootScope.testUrl = '/task/new';
        }

        $scope.login = function (data) {
            $scope.error = '';
            $http.post('/api/login', data)
                .success(function (response) {
                    $scope.authentication.user = response;
                    $rootScope.username = $rootScope.authentication.user.username;
                    $location.path($rootScope.testUrl).replace();
                })
                .error(function(err){
                    $scope.error = err.message;
                });
        };

        $scope.submitLoginForm = function(){
            if($scope.userForm.$valid) {
                $scope.login($scope.credentials);
            }
        }

        // This flag we use to show or hide the button in our HTML.
        $scope.signedIn = false;

        $scope.googleSignUp = function(){
            $scope.signedIn = true;
        }

        // Here we do the authentication processing and error handling.
        // Note that authResult is a JSON object.
        $scope.processAuth = function(authResult) {
            // Do a check if authentication has been successful
            if($scope.signedIn && authResult['access_token']) {
                $scope.gplus.id_token = authResult.id_token;

                $scope.login($scope.gplus);

            } else if(authResult['error']) {
                // Error while signing in.
                $scope.signedIn = false;

            }
        };

        // When callback is received, we need to process authentication.
        $scope.signInCallback = function(authResult) {
            $scope.$apply(function() {
                $scope.processAuth(authResult);
            });
        };

        // Render the sign in button.
        $scope.renderSignInButton = function() {
            gapi.signin.render('customSignIn',
                {
                    'callback': $scope.signInCallback, // Function handling the callback.
                    'clientid': '1046623217274-1k4a85q8ag1slqnaudfacd6imoiruhaa.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                    'scope': 'email https://www.googleapis.com/auth/userinfo.email',
                    'cookiepolicy': 'single_host_origin',
                    'response_type': 'token id_token'
                }
            );
        }

        // Start function in this example only renders the sign in button.
        $scope.start = function() {
            $scope.renderSignInButton();
        };

        // Call start function on load.
        $timeout(function(){
            $scope.start();
        },500);

}]);
