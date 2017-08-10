angular.module('appPrincipal')
.controller('DashboardCtrl', [
  '$scope',
  '$http',
  DashboardController
])

function DashboardController($scope, $http) {

  $scope.getSummary = function() {
    const url = 'http://localhost:5004/api/financeSummary'
    $http.get(url).then(function(response) {
        const {credit = 0, debt = 0} = response.data
        $scope.credit = credit
        $scope.debt = debt
        $scope.total = credit - debt
    })

  }

  $scope.getSummary()
}
