(function() {
  //'use strict';

  angular.module('automationApp.core')
    .controller('AppController', AppController);
	
  AppController.$inject = ['$scope', 'applicationService', 'quickViewService', 'builderService', '$location','scriptorService', '$state'];
  function AppController($scope, applicationService, quickViewService, builderService, $location, scriptorService, $state ) {

	  $scope.loadTaskId = "";
      $scope.runnerTaskJSON = {};

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

	  $scope.loadScript = function(){

		  if ($scope.loadTaskId == undefined || $scope.loadTaskId.length === 0) {
			  $scope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>','.modal-body');
		  }
		  else if ($scope.validateTaskId($scope.loadTaskId)){	// client side validation
			  // api call
			  scriptorService.getTaskJson($scope.loadTaskId).then(function(res) {
				  if (res.data.length == 0) {
					  $scope.showNotify('<div class="alert alert-danger"><p><strong>Error in getting Task Data</p></div>','.modal-body');
				  } else{
					  $('#modal-loadtask').modal('hide');
					  scriptorService.taskContent = res.data[0].task_json;
                      $scope.runnerTaskJSON = res.data[0].task_json;
					  $state.go('app.script-editor',  {id: res.data[0].sle_id});
					  $scope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data loaded successfully !' + '</p></div>');
				  }
			  });
			  //
		  } else{
			  $scope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Invalid Task Id !' + '</p></div>','.modal-body');
		  }
	  };
  }

})();