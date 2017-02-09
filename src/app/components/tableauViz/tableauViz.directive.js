/**
 * This directive requires a controller aliased as TableauCtrl to be available during run time. 
 * The controller is responsible for dashboard specific information, allowing this directive to remain 
 * abstract. 
 *
 * */

(function() {
  'use strict';

    angular
    .module('angularTableau')
    .directive('tableauVisualization', ['$log', TableauVisualizationDirective]);
    
    /* @ngInject */
    function TableauVisualizationDirective($log) {
        var directive = {
            restrict: 'E',
            scope: {
                url: '=',
                width: '=',
                height: '='
            },
            templateUrl: 'app/components/tableauViz/tableauViz.html',
            link: function(scope, elem, attrs) {
                var url = 'https://' + attrs.url;

                scope.workbook, scope.viz, scope.activeSheet = null;
                scope.$log = $log;
                scope.placeholderDiv = elem[0].querySelector('.vizContainer');
                
                scope.$on('update.parameter', updateParameter);
                scope.$on('update.filter', updateFilter);
                scope.$on('filter.reset', resetFilter);
                
                elem.css({
                    width: "100%",
                    height: Number(attrs.height)
                })

                elem.on('load', initializeViz());
                
                function initializeViz() {
                    var options = {
                        width: Number(attrs.width),
                        height: Number(attrs.height),
                        hideTabs: true,
                        hideToolbar: false,
                        onFirstInteractive: function () {
                            try {
                                scope.workbook = scope.viz.getWorkbook();
                            } catch(ex) {
                                scope.$log.error("Error caught in onFirstInteractive ", ex);
                            }
                        }
                    };
                    try {
                        scope.viz = new tableau.Viz(scope.placeholderDiv, url, options);
                    } catch(ex ) {
                        scope.$log.error("Error caught in viz construction: \n", ex);
                    }
                }

                function updateParameter(event, obj) {
                    if (obj.fieldName && obj.fieldValue) {
                        updateDashboardParameter(obj.fieldName, obj.fieldValue);
                    } else {
                        // if above properties are not defined, assume it is an array of objects containing those properties
                        try {
                            if (obj.length > 0) {
                                obj.forEach(function(arrayObj) {
                                    if (arrayObj) {
                                        if (arrayObj.fieldName && arrayObj.fieldValue) {
                                            updateDashboardParameter(arrayObj.fieldName, arrayObj.fieldValue);
                                        }
                                    }
                                });    
                            }
                        }
                        catch (ex ) {
                            vm.$log.error("Error in update parameter", ex);
                        }
                    }
                }

                function updateDashboardParameter(fieldName, fieldValue) {
                    if (scope.workbook) {
                        scope.workbook.changeParameterValueAsync(fieldName, fieldValue)
                        .then(function(result){
                            // nothing for now
                        }, function(error) {
                            scope.$log.error("Error in Tableau Viz", error);
                        });   
                    }
                }

                function updateFilter(event, obj) {
                    if (scope.workbook) {
                        var sheets = scope.workbook.getActiveSheet().getWorksheets();
                        var filterWorksheets = (obj.filterWorksheets && obj.filterWorksheets.length > 0) ? obj.filterWorksheets : sheets;
                        if (filterWorksheets) {
                            filterWorksheets.forEach(function (sheet) {
                                try {
                                        sheet.applyFilterAsync(obj.fieldName, obj.fieldValue, tableau.FilterUpdateType.REPLACE);
                                } catch (ex) {
                                    scope.$log.error('Error caught in Tableau Directive, update filter', ex);
                                }
                        });
                        }
                    }
                }

                function resetFilter(event, obj) {
                    if (scope.workbook) {
                        var sheets = scope.workbook.getActiveSheet().getWorksheets();
                        var filterWorksheets = (obj.filterWorksheets && obj.filterWorksheets.length > 0) ? obj.filterWorksheets : sheets;
                        if (filterWorksheets) {
                            filterWorksheets.forEach(function (sheet) {
                                try {
                                        sheet.clearFilterAsync(obj.fieldName);
                                } catch (ex) {
                                    scope.$log.error('Error caught in Tableau Directive, update filter', ex);
                                }
                        });
                        }
                    }
                }

            }
        };
        return directive;
    }
})();