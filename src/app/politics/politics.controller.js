(function() {
  'use strict';

  angular
    .module('angularTableau')
    .controller('PoliticsController', PoliticsController);

  /** @ngInject */
  function PoliticsController($scope) {
    var vm = this;

    vm.filter1 = function() {
        $scope.$broadcast('politics.filter');
    }

    vm.filter2 = function() {
      $scope.$broadcast('politics.filter2');
    }

    vm.reset = function() {
        $scope.$broadcast('politics.reset');
    }

  }
})();
