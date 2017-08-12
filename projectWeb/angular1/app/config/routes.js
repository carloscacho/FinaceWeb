(function() {
  angular.module('appPrincipal').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('dashboard', {
        url: "/dashboard",
        templateUrl: "dash/dashboard.html"
      }).state('finance', {
        url: "/finance?page",
        templateUrl: "finance/tabs.html"
      })

      $urlRouterProvider.otherwise('/dashboard')
    }
  ])
})()
