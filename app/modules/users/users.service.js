/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.users')
.factory('usersService', ['$rootScope', '$filter' , '$http', '$q', function($rootScope, $filter, $http, $q) {

    /***************** APIs ********************/

    var getUserDetails = function(username) {
        var userDetails = $http.get('/api/users/'+username);

        var deferred = $q.defer();
        deferred.resolve(userDetails);
        return deferred.promise;
    };

    var updateUserDetails = function(user) {
        var updateUser = $http.put('/api/users/' + user.username, {
            "name" : user.profile.name,
            "email" : user.profile.email
        });

        var deferred = $q.defer();
        deferred.resolve(updateUser);
        return deferred.promise;
    };

    return {
        "getUserDetails": getUserDetails,
        "updateUserDetails": updateUserDetails
    };
}]);
