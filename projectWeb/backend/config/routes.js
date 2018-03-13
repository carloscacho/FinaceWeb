const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
    * Rotas abertas
    */
    const router = express.Router()
    server.use('/api', router)

    //rotas da api
    const finaceService = require('../api/finace/financeService');
    finaceService.register(router, '/finance')

    const financeSummaryService = require('../api/finaceSummary/financeSummaryService')

}
