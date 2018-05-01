const finaceweb = require('./finaceweb')
var _ = require('lodash')

finaceweb.methods(['get', 'post', 'put', 'delete'])
finaceweb.updateOptions({new: true, runValidators: true})

//interceptar os erros
finaceweb.after('post', sendErrosOrNext).after('put', sendErrosOrNext)

function sendErrosOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors){
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  }else{
    console.log("tudo certo aqui");
    
    next()
  }

}

function parseErrors(nodeErrors) {
    const errors = []
    _.forIn(nodeErrors, error => errors.push(error.message))
    return errors
}

//routa que realiza a contabilidade dos registos
finaceweb.route('count', function(req, res, next) {
    finaceweb.count(function(error, value) {
      if(error){
        res.status(500).json({errors: [error]})
      }
      else{
        res.json({value})
      }

    })
})



module.exports = finaceweb
