(function() {
  //'use strict';

  angular.module('automationApp.core')
    .controller('AppController', AppController);
	
AppController.$inject = ['$scope', 'applicationService', 'quickViewService', 'builderService', '$location','scriptorService', '$state', '$rootScope'];
  function AppController($scope, applicationService, quickViewService, builderService, $location, scriptorService, $state, $rootScope ) {

	  $scope.username = username;
	  $scope.name = name;

	  $(document).ready(function () {
			applicationService.init();
			quickViewService.init();
		    Dropzone.autoDiscover = false;
		});

		$scope.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};

	  $scope.validateTaskId = function(input){
		  var regex = /[^a-z0-9.]/i; // not a valid task id string - contains other characters from a-z0-9.

		  if (regex.test(input)) {
			  return false;
		  } else {
			  return true;
		  }
	  };

	  $scope.showNotify = function(customText, panelSelector){

		  if ( panelSelector === undefined ) {
			  noty({
				  text        : customText,
				  layout      : 'topRight',
				  theme       : 'made',
				  maxVisible  : 1,
				  animation   : {
					  open  : 'animated fadeInRight',
					  close : 'animated fadeOut'
				  },
				  timeout: 3000
			  })
		  } else {
			  $(panelSelector).noty({
				  text        : customText,
				  layout      : 'TopCenter',
				  theme       : 'made',
				  maxVisible  : 1,
				  animation   : {
					  open  : 'animated fadeIn',
					  close : 'animated fadeOut'
				  },
				  timeout: 3000
			  });
		  }
		  $('.noty_inline_layout_container').delay(3000).fadeOut(1600);
	  };

	  $rootScope.$on('SCRIPTOR_LOAD_TASK', function(event, res) {
		  scriptorService.taskContent = res.data.task_json;
		  $state.go('app.script-editor',  {id: res.data.task_id});
		  $scope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data loaded successfully !' + '</p></div>');
	  });

	  $rootScope.showNotify = $scope.showNotify;

	  $rootScope.validateTaskId = $scope.validateTaskId;
  }

})();