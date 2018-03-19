angular.module('appPrincipal').constant('consts', {
    appName: 'MEAN - Primeira Aplicação',
    version: '1.0',
    owner: 'Carlos',
    year: '2017',
    site: 'https://github.com/carloscacho',
    apiUrl: 'https://finacewe-backend.herokuapp.com/api',
    oapiUrl: 'https://finacewe-backend.herokuapp.com/oapi',
    userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])