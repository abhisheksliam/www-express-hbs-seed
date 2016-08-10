/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.scriptor')
.factory('scriptorService', ['$rootScope', '$filter' , '$http', '$q', function($rootScope, $filter, $http, $q) {

        /***************** APIs ********************/

        var getGlobalContext = function() {
            var globalContext = $http.get('data/global_constants.json');

            var deferred = $q.defer();
            deferred.resolve(globalContext);
            return deferred.promise;
        }

        var getTaskJson = function(friendlyTaskId) {
            return $http.get('/api/tasks/' + friendlyTaskId);
        }

        var getTriggers = function() {
            var triggers = $http.get('data/action_lib.json');

            var deferred = $q.defer();
            deferred.resolve(triggers);
            return deferred.promise;
        }

        var getTriggerSuggestions = function() {
            var triggerSuggestion = $http.get('data/trigger_suggestions.json');

            var deferred = $q.defer();
            deferred.resolve(triggerSuggestion);
            return deferred.promise;
        }

        var getTriggerForID = function(id) {
            var dest = {};
            var source = $filter('filter')($rootScope.triggers, {id:id})[0];
            angular.copy(source, dest);
            return dest;
        }

        var getKeyNameSuggestions = function() {
            return $rootScope.TriggerSuggestions.keyboardActions;
        }

        var getElementNameSuggestions = function() {
            return $rootScope.TriggerSuggestions.elementNameSuggestion;
        }


        var getXPathForElement = function(elementName) {
            return $rootScope.TriggerSuggestions.xPathForElement[elementName];
        }

        var saveTaskScript = function(app_key, scenario, task_id, template) {
            var saveTask = $http.post('/api/tasks/', {
                "app_key" : app_key,
                "scenario" : scenario,
                "task_id" : task_id,
                "template" : template
            });

            var deferred = $q.defer();
            deferred.resolve(saveTask);
            return deferred.promise;
        }

        var updateTaskJson = function(sle_id, task_json) {
            var updateTask = $http.put('/api/tasks/' + sle_id, {
                "task_json" : task_json
            });

            var deferred = $q.defer();
            deferred.resolve(updateTask);
            return deferred.promise;
        }


        return {
        "taskContent" : {},
        "getGlobalContext": getGlobalContext,
        "getTaskJson": getTaskJson,
        "saveTaskScript": saveTaskScript,
        "updateTaskJson": updateTaskJson,
        "getTriggers":  getTriggers,
        "getTriggerForID": getTriggerForID,
        "getTriggerSuggestions": getTriggerSuggestions,
        "getKeyNameSuggestions":getKeyNameSuggestions,
        "getElementNameSuggestions":getElementNameSuggestions,
        "getXPathForElement" : getXPathForElement
    };
}]);
