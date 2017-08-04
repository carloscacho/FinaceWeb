const express = require('express')

module.exports = function(server) {
    //api routes

    const router = express.Router()
    server.use('/api', router)

    //rotas da api
    const finaceService = require('../api/finace/financeService');
    finaceService.register(router, '/finance')
}
