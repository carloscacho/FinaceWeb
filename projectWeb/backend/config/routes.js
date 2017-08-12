const express = require('express')

module.exports = function(server) {
    //api routes

    const router = express.Router()
    server.use('/api', router)

    //rotas da api
    const financeService = require('../api/finance/financeService');
    financeService.register(router, '/finance')

    const financeSummaryService = require('../api/financeSummary/financeSummaryService')

    router.route('/financeSummary').get(financeSummaryService.getSummary)
}
