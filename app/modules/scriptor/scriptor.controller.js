(function() {
  'use strict';

  angular.module('automationApp.scriptor')
    .controller('NewScriptController', NewScriptController);

  NewScriptController.$inject = ['$scope','$state','scriptorService'];
  function NewScriptController($scope, $state, scriptorService) {
    $scope.scriptor = scriptorService;

    $scope.applications = [
      "Word",
      "Access",
      "PPT",
      "Excel"
    ];

    $scope.scenarios = [
      "T1",
      "A1"
    ];

    $scope.scenarioType = $scope.scenarios[0];
    $scope.applicationName = $scope.applications[0];

    $scope.displayScript = function(){
      $scope.scriptor.scenarioType = $scope.scenarioType;
      $scope.scriptor.applicationName = $scope.applicationName;
      $scope.scriptor.taskId = $scope.taskId;

      $state.go('displayscript');
    };

   }
})();
