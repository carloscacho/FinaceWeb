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
          //definido qual a pagina está sendo visualizada pelo usuário
          const page = parseInt($location.search().page) || 1

          //Iniciando o calculo dos valores definido no mongodb
          $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response) {
            vm.finance = {credits:[{}], debts:[{}]}
            vm.finances = response.data
            vm.calcularValues()
            tabs.show(vm, {tabList: true, tabCreate: true})
          
            http.get(`${url}/count`).then((response) => {
              //calcular quantas paginas são necessarias para ter somente 
              //10 elementos por paginas
              vm.pages = Math.ceil(response.data.value / 10)

            });
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
          vm.calcularValues();
          tabs.show(vm, {tabUpdate: true})

        }


        vm.showTabDelete = function(finance) {
            vm.finance = finance
            vm.calcularValues();
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

        //implementação dos botoes de ação
        //botão de adicionar credito
        vm.btnAddCredit = function(index){
          vm.finance.credits.splice(index+1, 0,{});
        }

        //botão de clonar credito
        vm.btnCloneCredit = function(index, {name, value}){
          vm.finance.credits.splice(index+1, 0, {name, value});
          vm.calcularValues() 
        }

        //botão de deletar Credito
        vm.btnDeleteCredit = function(index){
          if(vm.finance.credits.length > 1){
            vm.finance.credits.splice(index, 1);
            vm.calcularValues();
          } 
        }

       //implementação dos botoes de ação  de delete
        //botão de adicionar credito
        vm.btnAddDebit = function(index){
          vm.finance.debts.splice(index + 1, 0,{});
        }

        //botão de clonar credito
        vm.btnCloneDebit = function(index, {name, value, status}){
          vm.finance.debts.splice(index + 1, 0, {name, value, status});
          vm.calcularValues()  
        }

        //botão de deletar Credito
        vm.btnDeleteDebit = function(index){
          if(vm.finance.debts.length > 1){
            vm.finance.debts.splice(index, 1);
            vm.calcularValues() 
          } 
        }

        //para o funcionamento do component Summary
        vm.calcularValues = function(){
          vm.credit = 0
          vm.debit = 0

          if (vm.finance){
            //calculo dos valores de creditos
            vm.finance.credits.forEach(({value}) => {
              vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
            });
            //calculo para os valores de debitos
            vm.finance.debts.forEach(({value}) => {
              vm.debit += !value || isNaN(value) ? 0 : parseFloat(value)
            });

            //calculo do valor Total
            vm.total = vm.credit - vm.debit

          }
        }

        vm.refresh()
    }
})()
