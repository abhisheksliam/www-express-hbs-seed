/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('method', ['$timeout', '$rootScope', function($timeout, $rootScope) {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/scriptor/directives/views/method.tpl.html',
            scope: {
                'item': '=',
                'method': '=',
                'index' : '='
            },
            link: function (scope, element, attributes) {

                scope.$watch('item', function(newValue) {
                    if (newValue !== undefined) {
                        scope.$emit('INTIALIZE_METHOD_SORTABLE', "");
                    }
                });

                scope.$watch('method', function(newValue) {
                    if (newValue !== undefined) {
                        if (!$rootScope.initializeDrop) {
                            $rootScope.initializeDrop = true;
                        }
                        scope.$emit('INTIALIZE_TRIGGER_SORTABLE', "");
                    }
                });

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
                    var methodNumber = parseInt($(this).closest('.dd-list').index());
                    var $item = $(this).parents(".dd-item:first");

                    bootbox.confirm("Are you sure to delete this method?", function (result) {
                        if (result === true) {
                            $item.addClass("animated bounceOutRight");
                            window.setTimeout(function () {
                                scope.item.methods.splice(methodNumber, 1);
                                scope.$apply();
                            }, 300);
                        }
                    });
                    event.stopPropagation();
                });

                element.on('click',".item-level-1 .panel-copy",function (event) {
                    event.preventDefault();
                    var methodNumber = parseInt($(this).closest('.dd-list').index());
                    var methodToCopy = angular.copy(scope.item.methods[methodNumber]);

                    scope.item.methods.splice(methodNumber, 0, methodToCopy);
                    scope.$apply();

                    scope.$emit('SCRIPTOR_NEW_ITEM_ADDED', "");
                    event.stopPropagation();
                });

                element.on('click',".select-method",function (event) {
                    event.preventDefault();

                    var methodNumber = parseInt($(this).closest('.dd-list').index());
                    $(this).parents(".dd-item:first").addClass("highlight-select");

                    $rootScope.copiedMethod = angular.copy(scope.item.methods[methodNumber]);

                    scope.$apply();
                    event.stopPropagation();
                });

                element.on('click',".paste-method",function (event) {
                    event.preventDefault();

                    var methodNumber = parseInt($(this).closest('.dd-list').index());
                    $("#scriptor-content .dd-item").removeClass("highlight-select");

                    scope.item.methods.splice(methodNumber + 1, 0, $rootScope.copiedMethod);
                    $rootScope.copiedMethod = undefined;
                    scope.$apply();

                    $(this).closest('.dd-list').next().addClass("highlight-select transition");

                    $timeout(function(){
                        $("#scriptor-content .dd-list").removeClass("highlight-select transition");
                    },1000);
                    scope.$emit('SCRIPTOR_NEW_ITEM_ADDED', "");
                    event.stopPropagation();
                });

                element.on('click',".paste-first-trigger",function (event) {
                    event.preventDefault();

                    $("#scriptor-content .dd-item").removeClass("highlight-select");

                    scope.method.actions.splice(0, 0, $rootScope.copiedTrigger);
                    $rootScope.copiedTrigger = undefined;
                    scope.$apply();

                    $(this).closest('.dd-list').prev().addClass("highlight-select transition");

                    $timeout(function(){
                        $("#scriptor-content .dd-list").removeClass("highlight-select transition");
                    },1000);
                    event.stopPropagation();
                });


                element.on('click',".item-level-1 .panel-move",function (event) {
                    event.preventDefault();
                    //todo
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

