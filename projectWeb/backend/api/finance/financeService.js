const financeweb = require('./financeweb')
var _ = require('lodash')

financeweb.methods(['get', 'post', 'put', 'delete'])
financeweb.updateOptions({new: true, runValidators: true})

//interceptar os erros
financeweb.after('post', sendErrosOrNext).after('put', sendErrosOrNext)

function sendErrosOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors){
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  }else{
    next()
  }

}

function parseErrors(nodeErrors) {
    const errors = []
    _.forIn(nodeErrors, error => errors.push(error.message))
    return errors
}

//routa que realiza a contabilidade dos registos
financeweb.route('count', function(req, res, next) {
    financeweb.count(function(error, value) {
      if(error){
        res.status(500).json({errors: [error]})
      }
      else{
        res.json({value})
      }

    })
})



module.exports = financeweb
