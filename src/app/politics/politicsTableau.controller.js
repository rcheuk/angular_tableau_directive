(function() {
  'use strict';

  angular
    .module('angularTableau')
    .controller('PoliticsTableauController', PoliticsTableauController);

  /** @ngInject */
  function PoliticsTableauController($log, $scope, $timeout) {
    var vm = this;
    
    vm.$log = $log;
    // do something

    // listen for start and stop
    $scope.$on('politics.filter', filter);
    $scope.$on('politics.filter2', filter2);
    $scope.$on('politics.reset', reset);

    function filter() {
        var updateData = {};
            updateData.fieldName = 'Reference date';
            updateData.fieldValue = '1/1/2012';

        $scope.$broadcast('update.parameter', updateData);
    }

    function filter2() {
        var updateData = {};
            updateData.fieldName = 'Reference date';
            updateData.fieldValue = '1/1/1919';

        $scope.$broadcast('update.parameter', updateData);
    }

    function reset() {
        var obj = {};
        obj.fieldName = 'Year';
        $scope.$broadcast('filter.reset', obj);
    }
  }
})();
