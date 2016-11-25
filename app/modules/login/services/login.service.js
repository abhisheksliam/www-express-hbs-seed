/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.login')
.factory('loginService', ['$http', '$q', function($http, $q) {

    /***************** APIs ********************/

    var loginUser = function(data) {

        var loginUser = $http.post('/api/login', data);

        var deferred = $q.defer();
        deferred.resolve(loginUser);
        return deferred.promise;
    };

    return {
        "loginUser": loginUser
    };
}]);
