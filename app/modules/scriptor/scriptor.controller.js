(function() {
  'use strict';

  angular.module('automationApp.scriptor')
    .controller('NewScriptController', NewScriptController);


  NewScriptController.$inject = ['$scope', 'pluginsService', 'applicationService', '$location', '$state', 'scriptorService'];
  function NewScriptController($scope, pluginsService, applicationService, $location, $state, scriptorService) {
	  $scope.scriptor = scriptorService;
	  
	  /* Template Code to be kept in first route to be loaded */
	  $scope.$on('$viewContentLoaded', function () {
			pluginsService.init();
			applicationService.customScroll();
			applicationService.handlePanelAction();
			$('.nav.nav-sidebar .nav-active').removeClass('nav-active active');
			$('.nav.nav-sidebar .active:not(.nav-parent)').closest('.nav-parent').addClass('nav-active active');

			if($location.$$path == '/'){
				$('.nav.nav-sidebar .nav-parent').removeClass('nav-active active');
				$('.nav.nav-sidebar .nav-parent .children').removeClass('nav-active active');
				if ($('body').hasClass('sidebar-collapsed') && !$('body').hasClass('sidebar-hover')) return;
				if ($('body').hasClass('submenu-hover')) return;
				$('.nav.nav-sidebar .nav-parent .children').slideUp(200);
				$('.nav-sidebar .arrow').removeClass('active');
				$('body').addClass('dashboard');
			} else {
				$('body').removeClass('dashboard');
			}

	  });
	  
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

	  $scope.triggers = [
		  {
			  name:"clickAndWait(String elementName)",
			  id:"clickAndWait(String elementName)"
		  },
		  {
			  name:"selectCell(String cellName)",
			  id:"selectCell(String cellName)"
		  },
		  {
			  name:"rightClickOnCell(String cellName)",
			  id:"rightClickOnCell(String cellName)"
		  },
		  {
			  name:"doubleClick(String elementName)",
			  id:"doubleClick(String elementName)"
		  },
		  {
			  name:"clickAtCurrentPos()",
			  id:"clickAtCurrentPos()"
		  },
		  {
			  name:"clickAndHoldCurrentPos()",
			  id:"clickAndHoldCurrentPos()"
		  },
		  {
			  name:"clickMultipleTimes(String elementName , String numOfTimes)",
			  id:"clickMultipleTimes(String elementName , String numOfTimes)"
		  },
		  {
			  name:"doubleClickAndWait()",
			  id:"doubleClickAndWait()"
		  },
		  {
			  name:"rightClickCurrentPos()",
			  id:"rightClickCurrentPos()"
		  }
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
