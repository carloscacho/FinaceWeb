//IIFE
(function() {

  angular.module('appPrincipal')
  .controller('DashboardCtrl', [
    '$http',
    DashboardController
  ])

  function DashboardController($http) {
    const vm = this
    vm.getSummary = function() {
      const url = 'https://finacewe-backend.herokuapp.com/api/financeSummary'
      $http.get(url).then(function(response) {
          const {credit = 0, debt = 0} = response.data
          vm.credit = credit
          vm.debt = debt
          vm.total = credit - debt
      })

    }

    vm.getSummary()
  }

})()
