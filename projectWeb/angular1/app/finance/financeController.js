(function() {
    angular.module('appPrincipal').controller('FinanceCtrl', [
      '$http',
      'msgs',
      FinanceController
    ])
    function FinanceController($http, msgs) {
        const vm = this
        const url = 'http://localhost:5004/api/finance'

        vm.refresh = function() {
          $http.get(url).then(function(response) {
            vm.finance = {}
            vm.finances = response.data
          })
        }

        vm.create = function() {

          $http.post(url, vm.finance).then(function(response) {
              vm.refresh()
              msgs.addSuccess('Operação Realizada com Sucesso')
          }).catch(function(response) {
              msgs.addError(response.data.errors)
          })
        }

        vm.refresh()
    }
})()
