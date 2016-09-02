"use strict";

angular.module('automationApp.runner')
    .filter('pathwayFilter', function() {
        return function(items){
            var newArray = [];
            for(var x = 0; x < items.length; x+=2){
                newArray.push({
                    "pathway" : items[x],
                    "group": items[x + 1]
                });
            }

            return newArray;
        }
    });