(function () {

    angular.module('appPrincipal').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($location, msgs, auth) {
        const vm = this

        //variavel para halitar o login
        vm.loginMode = true
        //apos logar altarar o login mode
        vm.changeMode = () => vm.loginMode = !vm.loginMode
        
        //metodo de login do usuário
        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }
        //metodo para cadastrar usuário
        vm.signup = () => {
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        //função que retorna info do usuario logado
        vm.getUser = () => auth.getUser()
        

        //metodo para sair da aplicação
        vm.logout = () => {
            auth.logout(() => $location.path('/'))
        }
    }
   

})()