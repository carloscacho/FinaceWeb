const _ = require('lodash')
var finaceweb = require('../finace/finaceweb')

// middleware de agregação dos valores
function getSummary(req, res) {
  finaceweb.aggregate([{
    $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
  }, {
    $group: {
      _id: null,
      credit: {$sum: "$credit"},
      debt: {$sum: "$debt"}
    }
  },{
    $project: {
      _id:0,
      credit:1,
      debt: 1
    }
  }]).exec(function (error, result) {
    if(error){
      res.status(500).json({errors: [error]})
    }else{
      res.json(_.defaults(result[0], {credit:0, debt:0}))
    }
  })

}

module.exports = { getSummary }
