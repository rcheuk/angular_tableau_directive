(function() {
  'use strict';

  angular
    .module('angularTableau')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'app/about/about.html',
        controller: 'AboutController',
        controllerAs: 'AboutCtrl'
      })
      .when('/climate', {
        templateUrl: 'app/climate_change/climate_change.html',
        controller: 'ClimateController',
        controllerAs: 'ClimateCtrl'
      })
      .when('/politics', {
        templateUrl: 'app/politics/politics.html',
        controller: 'PoliticsController',
        controllerAs: 'PoliticsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
