(function() {
    angular.module('appPrincipal').controller('FinanceCtrl', [
      '$http',
      'msgs',
      'tabs',
      FinanceController
    ])
    function FinanceController($http, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:5004/api/finance'

        vm.refresh = function() {
          $http.get(url).then(function(response) {
            vm.finance = {}
            vm.finances = response.data
            tabs.show(vm, {tabList: true, tabCreate: true})
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

        vm.showTabUpdate = function(finance) {
          vm.finance = finance
          tabs.show(vm, {tabUpdate: true})

        }


        vm.showTabDelete = function(finance) {
            vm.finance = finance
            tabs.show(vm, {tabDelete: true})

        }

        vm.delete = function() {
          const deleteUrl = `${url}/${vm.finance._id}`
          $http.delete(deleteUrl, vm.finance).then(function(response) {
                vm.refresh()
                msgs.addSuccess(`Operação de exclusão realizada com Sucesso!`)
          }).catch(function(response) {
              msgs.addError(response.data.errors)
          })
        }

        vm.update = function() {
          const updateUrl = `${url}/${vm.finance._id}`
          $http.put(updateUrl, vm.finance).then(function(response) {
                vm.refresh()
                msgs.addSuccess(`Operação de alteração realizada com Sucesso!`)
          }).catch(function(response) {
              msgs.addError(response.data.errors)
          })
        }

        vm.refresh()
    }
})()
