angular.module('appPrincipal').constant('consts', {
    appName: 'MEAN - Primeira Aplicação',
    version: '1.0',
    owner: 'Carlos',
    year: '2017',
    site: 'https://github.com/carloscacho',
    apiUrl: 'http://localhost:5004/api',
    oapiUrl: 'http://localhost:5004/oapi',
    userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])