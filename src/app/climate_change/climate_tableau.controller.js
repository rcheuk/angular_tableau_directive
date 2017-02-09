(function() {
  'use strict';

  angular
    .module('angularTableau')
    .controller('ClimateTableauController', ClimateTableauController);

  /** @ngInject */
  function ClimateTableauController($log, $scope, $timeout) {
    var vm = this;
    
    vm.$log = $log;
    // do something

    // listen for start and stop
    $scope.$on('climate.filter', filter);
    $scope.$on('climate.reset', reset);

    function filter() {
        var years = ['2016', '2006'];
        var worksheets = []; //if limiting to specific worksheets for performance, list worksheets here, else it will assume all
                
        var obj = {};
            obj.filterWorksheets = worksheets;
            obj.fieldName = 'Year';
            obj.fieldValue = years;

        $scope.$broadcast('update.filter', obj);
    }

    function reset() {
        var obj = {};
        obj.fieldName = 'Year';
        $scope.$broadcast('filter.reset', obj);
    }
  }
})();
