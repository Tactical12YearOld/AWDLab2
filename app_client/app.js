(function () {

    angular.module('bloggerApp', ['ngRoute']);
  
    function config ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'pages/home.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/'});
    }
  
    angular
      .module('bloggerApp')
      .config(['$routeProvider', config]);
  
  })();