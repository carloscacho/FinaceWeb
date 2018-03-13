const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    //rotas da api
    const finaceService = require('../api/finace/financeService');
    finaceService.register(router, '/finance')

    const financeSummaryService = require('../api/finaceSummary/financeSummaryService')

}
