const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    //rotas para as login cadastro e validaToken
    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)
    
    // protectedApi.use((req, res, next) => {
    //     if(req.method === 'OPTIONS') {
    //         //esse metod retorna quais são os metodos que podem ser consumido de uma outra origem
    //         next()
    //     //caso for outro metodo e verificado o TOKEN
    //     }
    //     //aqui tem fazer acesso a dados do usuario
        
    //     console.log("só passando por aqui");
    //     next()
    // })

    //rotas da api
    const finaceService = require('../api/finace/financeService');
    finaceService.register(protectedApi, '/finance')

    const financeSummaryService = require('../api/finaceSummary/financeSummaryService')
    protectedApi.route('/financeSummary').get(financeSummaryService.getSummary)

}