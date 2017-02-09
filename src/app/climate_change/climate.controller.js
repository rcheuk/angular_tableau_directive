(function() {
  'use strict';

  angular
    .module('angularTableau')
    .controller('ClimateController', ClimateController);

  /** @ngInject */
  function ClimateController($log, $scope) {
    var vm = this;
    
    vm.$log = $log;

    vm.filter = function() {
        $scope.$broadcast('climate.filter');
    }

    vm.reset = function() {
        $scope.$broadcast('climate.reset');
    }

  }
})();
