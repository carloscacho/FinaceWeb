(function() {
    angular.module('appPrincipal').controller('FinanceCtrl', [
      '$http',
      '$location',
      'msgs',
      'tabs',
      FinanceController
    ])
    function FinanceController($http, $location, msgs, tabs) {
        const vm = this
        const url = 'http://localhost:5004/api/finance'

        vm.refresh = function() {
          const page = parseInt($location.search().page) || 1
          $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response) {
            vm.finance = {credits:[{}], debts:[{}]}
            vm.finances = response.data
            vm.calculateValues()


            $http.get(`${url}/count`).then(function(response) {
                vm.pages = Math.ceil(response.data.value / 10)
                tabs.show(vm, {tabList: true, tabCreate: true})
            })
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

        //open tabs for update or delete
        vm.showTabUpdate = function(finance) {
          vm.finance = finance
          vm.calculateValues()
          tabs.show(vm, {tabUpdate: true})

        }


        vm.showTabDelete = function(finance) {
            vm.finance = finance
            vm.calculateValues()
            tabs.show(vm, {tabDelete: true})

        }

        //function of buttons
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

        //credits button
        vm.addCredit = function(index) {
            vm.finance.credits.splice(index + 1, 0, {})
        }
        vm.cloneCredit = function(index, {name, value}) {
            vm.finance.credits.splice(index + 1, 0, {name, value})
            vm.calculateValues()
        }
        vm.deleteCredit = function(index) {
            if(vm.finance.credits.length > 1){
              vm.finance.credits.splice(index, 1)
              vm.calculateValues()
            }

        }

        //debts button
        vm.addDebt = function(index) {
            vm.finance.debts.splice(index + 1, 0, {})
        }
        vm.cloneDebt = function(index, {name, value, status}) {
            vm.finance.debts.splice(index + 1, 0, {name, value, status})
            vm.calculateValues()
        }
        vm.deleteDebt = function(index) {
            if(vm.finance.debts.length > 1){
              vm.finance.debts.splice(index, 1)
              vm.calculateValues()
            }

        }

        //summary
        vm.calculateValues = function() {
            vm.credit = 0
            vm.debt = 0

            if(vm.finance){
              vm.finance.credits.forEach(function({value}) {
                vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
              })

              vm.finance.debts.forEach(function({value}) {
                vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
              })
            }
            vm.total = vm.credit - vm.debt
        }

        vm.refresh()
    }
})()
