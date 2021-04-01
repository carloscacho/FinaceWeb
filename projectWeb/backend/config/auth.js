const jwt = require('jsonwebtoken')
// const env = require('../.env')

//middleware resposavel por proteger a API contra acesso indevidos 
module.exports = (req, res, next) => {

    // CORS preflight request
    //verifica se metodo da requisção é OPTIONS
    if(req.method === 'OPTIONS') {
        //esse metod retorna quais são os metodos que podem ser consumido de uma outra origem
        next()
    //caso for outro metodo e verificado o TOKEN
    } else {
        //pega o token em alguma das origens
        const token = req.body.token || req.query.token || req.headers['authorization']

        //caso não venha o token
        if(!token) {
          return res.status(403).send({errors: ['No token provided.']})
        }
        //e verificado se toke foi criado pela API
        jwt.verify(token, process.env.AUTH_SECRET, function(err, decoded) {
          if(err) {
            return res.status(403).send({
                errors: ['Failed to authenticate token.']
          })
        } else {
            req.decoded = decoded
            //caso é validado chama o next middleware
            next()
        }
      })
    }
}
