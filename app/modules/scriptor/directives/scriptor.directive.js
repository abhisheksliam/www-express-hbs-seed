/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
.directive('runnerNestedList', ['$timeout', function($timeout) {

    return {
        restrict: 'A',
        templateUrl: 'modules/scriptor/directives/scriptor.tpl.html',
        scope: {
            'items': '='
        },
        link: function (scope, element, attributes) {
            $timeout(function(){
                element.nestable();
                element.nestable('collapseAll');

                element.sortable({
                    placeholder: "placeholder-ui",
                    handle: ".item-level-0"
                });

                element.find( ".li-level-0" ).sortable({
                    items: "ol",
                    placeholder: "placeholder-ui",
                    handle: ".item-level-1"
                });

                element.find( ".li-level-1" ).sortable({
                    items: "ol",
                    placeholder: "placeholder-ui",
                    handle: ".item-level-2"
                });

                element.find(".top-level.dd3-content").click(function (event) {
                    //event.preventDefault();
                    //element.find('.bg-primary').removeClass('bg-primary');
                    //$(this).addClass('bg-primary');
                });

            });
        }
    }
}]);


