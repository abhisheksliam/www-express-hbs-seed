/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('method', ['$timeout', function($timeout) {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/scriptor/directives/method.tpl.html',
            scope: {
                'item': '=',
                'method': '=',
                'index' : '=',
                'methodtypelist' : '='
            },
            link: function (scope, element, attributes) {

                element.on('click',".baloo-actions-text",function (event) {
                    event.preventDefault();

                    var parent = $(this).parent();
                    parent.siblings(".data-items").width("60%");
                    parent.siblings(".baloo-action-content").show();

                    event.stopPropagation();
                });

                element.on('click',".baloo-action-close",function (event) {
                    event.preventDefault();

                    var content = $(this).closest(".baloo-action-content");
                    content.siblings(".data-items").width("100%");
                    content.hide();

                    event.stopPropagation();
                });

                element.on('click',".item-level-1 .panel-close",function (event) {
                    event.preventDefault();
                    alert('len ' + scope.method.length);
                    var $item = $(this).parents(".dd-item:first");

                    bootbox.confirm("Are you sure to delete this method?", function (result) {
                        if (result === true) {
                            $item.addClass("animated bounceOutRight");
                            window.setTimeout(function () {
                                $item.remove();
                            }, 300);
                        }
                    });
                    event.stopPropagation();
                });

                element.on('click',".item-level-1 .panel-copy",function (event) {
                    event.preventDefault();
                    //todo

                    event.stopPropagation();
                });

                element.on('click',".item-level-1 .panel-move",function (event) {
                    event.preventDefault();
                    //todo
                    event.stopPropagation();
                });

                element.on('click',".copy-method",function (event) {
                    event.preventDefault();
                    var methodNumber = parseInt($(this).closest('.li-level-1').data('id'));
                    var methodToCopy = angular.copy(scope.item.methods[methodNumber]);

                    scope.item.methods.splice(methodNumber, 0, methodToCopy);
                    scope.$apply();
                    event.stopPropagation();
                });

                element.on('click',".add-method-link",function (event) {
                    event.preventDefault();
                    var methodNumber = parseInt($(this).closest('.li-level-1').data('id'));
                    var methodToCopy = angular.copy(scope.item.methods[methodNumber]);

                    scope.item.methods.splice(methodNumber, 0, methodToCopy);
                    scope.$apply();
                    event.stopPropagation();
                });

                element.closest('.add-method-link').on('click',function (event) {
                    event.preventDefault();

                    var newMethodTemplate = {
                        "init": true,
                        "type": "Ribbon",
                        "balooActions": [
                            {
                                "text": ""
                            }
                        ],
                        "actions": [

                        ],
                        "group": "NOT_FOUND"
                    };

                    console.log($(this));
                    //var itemNumber = parseInt($(this).closest('.li-level-0').data('id'));
                    scope.item.methods.push(newMethodTemplate);

                    scope.$apply();
                    event.stopPropagation();
                });

                $timeout(function(){
                    var methodTypeSelect = element.find('select').select2({
                        dropdownCssClass: 'form-white',
                        minimumResultsForSearch: -1
                    });
                    methodTypeSelect.select2('val', scope.method.type);
                    methodTypeSelect.on("change", function (e) {
                        scope.method.type = e.val;
                        scope.$apply();
                    });
                },200);

            }
        }
    }]);

