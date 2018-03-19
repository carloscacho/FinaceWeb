(function () {
    angular.module('appPrincipal').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ])

    function AuthFactory($http, consts) {
        let user = null

        function signup(user, callback) {
            submit('signup', user, callback)
        }

        function login(user, callback) {
            submit('login', user, callback)
        }

        //utilizado tanto para função de login como singup
        function submit(url, user, callback) {
            $http.post(`${consts.oapiUrl}/${url}`, user)
                .then(resp => {
                    //após corretudo ok com cadastro ou login 
                    //as informações do usuario são salvas no localstorage
                    localStorage.setItem(consts.userKey, JSON.stringify(resp.data))
                    $http.defaults.headers.common.Authorization = resp.data.token
                    if (callback) callback(null, resp.data)
                }).catch(function (resp) {
                    if (callback) callback(resp.data.errors, null)
                })
        }

        //função que remove as informações do usuario do localstorage
        function logout(callback) {
            user = null
            localStorage.removeItem(consts.userKey)
            $http.defaults.headers.common.Authorization = ''
            if (callback) {
                callback(null)
            }
            
        }

        //função que recebe o token e verfica a validade
        function validateToken(token, callback) {
            if (token) {
                $http.post(`${consts.oapiUrl}/validateToken`, {
                        token
                    })
                    .then(resp => {
                        if (!resp.data.valid) {
                            logout()
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }
                        if (callback) callback(null, resp.data.valid)
                    }).catch(function (resp) {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token inválido.')
            }
        }

        //adquire as informações de usuario do localstorage
        function getUser() {
            if (!user) {
                user = JSON.parse(localStorage.getItem(consts.userKey))
                $http.defaults.headers.common.Authorization = user ? user.token : null
            }
            return user
        }

        return {
            signup,
            login,
            logout,
            getUser,
            validateToken
        }
    }


})()