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

    //rotas da api
    const finaceService = require('../api/finace/financeService');
    finaceService.register(protectedApi, '/finance')

    const financeSummaryService = require('../api/finaceSummary/financeSummaryService')
    protectedApi.route('/financeSummary').get(financeSummaryService.getSummary)

}