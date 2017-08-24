const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)

<<<<<<< HEAD
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

    const billingCycleService = require('../api/finance/financeService')
    billingCycleService.register(protectedApi, '/finance')

    const billingSummaryService = require('../api/financeSummary/financeSummaryService')
    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)

=======
    //rotas da api
    const finaceService = require('../api/finace/financeService');
    finaceService.register(router, '/finance')

    const financeSummaryService = require('../api/finaceSummary/financeSummaryService')
>>>>>>> parent of f856c77... paginator

}
