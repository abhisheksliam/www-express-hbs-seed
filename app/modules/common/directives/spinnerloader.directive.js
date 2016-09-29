"use strict";

angular.module('automationApp')
    .directive('spinnerLoader', ['$http', function($http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        element.show();
                    }else{
                        element.hide();
                    }
                });

                /*
                 element.addClass('hide');
                 $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide');
                 });
                 $rootScope.$on('$stateChangeSuccess', function() {
                    setTimeout(function(){
                        element.addClass('hide');
                    },500);
                    $("html, body").animate({
                        scrollTop: 0
                    }, 500);
                 });
                 */
            }
        };
}]);




