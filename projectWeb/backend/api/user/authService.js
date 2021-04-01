const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
// const env = require('../../.env')

//expressoes regulares que dizem como deve ser o formato da email e da senha
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

//metodo que apresenta alguns dos erros que ocorrem no banco de dados 
//caso a autenticação de errado
const sendErrorsFromDB = (res, dbErrors) => {
  const errors = []
  _.forIn(dbErrors.errors, error => errors.push(error.message))
  return res.status(400).json({
    errors
  })
}

//metodo de login que é middleware 
const login = (req, res, next) => {
  //requisita email e senha
  const email = req.body.email || ''
  const password = req.body.password || ''

  //realiza uma consulta a coletion de User
  //coleta um unico usuario por email
  User.findOne({email}, (err, user) => {
    if (err) {
      //caso cause erro isso será informado para o usario
      return sendErrorsFromDB(res, err)
      //caso contrario e verificado se retornou um user valido
      //em seguida e compada a senha criptografada
    } else if (user && bcrypt.compareSync(password, user.password)) {
      //se email e senha forem cooretos e criado um token com validade de 1 dia
      const token = jwt.sign(user, process.env.AUTH_SECRET, {
        expiresIn: "1 day"
      })
      
      const { name, email } = user
      //e enviado para o sistema o nome email e token
      res.json({ name, email, token })
    //caso deu qualquer erro na autenticação será enviado uma messagem de erro
    } else {
      return res.status(400).send({
        errors: ['Usuário/Senha inválidos']
      })
    }
  })
}

//um middleware para validar o token para manter o usuario logado
const validateToken = (req, res, next) => {
  const token = req.body.token || ''
  //e utilizado o o token e segrendo para validação
  jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
    return res.status(200).send({
      valid: !err
    })
  })
}

//metodo de cadastro de usuario
const signup = (req, res, next) => {
  //coleta as informação informadas pelo usuario
  const name = req.body.name || ''
  const email = req.body.email || ''
  const password = req.body.password || ''
  const confirmPassword = req.body.confirm_password || ''
  //verifica se email está na formatação correta com a expressão regular
  if (!email.match(emailRegex)) {
    return res.status(400).send({
      errors: ['O e-mail informado está inválido']
    })
  }
  //verifica se senha está na formatação correta com a expressão regular
  if (!password.match(passwordRegex)) {
    return res.status(400).send({
      errors: [
        "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um n úmero, uma caractere especial(@#$%) e tamanho entre 6-12."
      ]
    })

  }

  //verificação se a senha e conf senha batem
  const salt = bcrypt.genSaltSync()
  //a verificação e feita com a senha criptografada
  const passwordHash = bcrypt.hashSync(password, salt)
  if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
    return res.status(400).send({
      errors: ['Senhas não conferem.']
    })
  }

  //e verificado se o existe um usuario com mesmo email
  User.findOne({
    email
  }, (err, user) => {
    if (err) {
      return sendErrorsFromDB(res, err)
      //caso exista um usuario com mesmo email
      // essa informação é apresentada como erro
    } else if (user) {
      return res.status(400).send({
        errors: ['Usuário já cadastrado.']
      })
    //caso não exista e criado um novo usuario 
    } else {
      const newUser = new User({
        name,
        email,
        //e enviado o hash criado com a senha digitada
        password: passwordHash
      })
      //e as infromações são salvas no banco de dados
      newUser.save(err => {
        if (err) {
          return sendErrorsFromDB(res, err)
        } else {
          //ao finalizar o cadastro é realizado o login
          login(req, res, next)
        }
      })
    }
  })
}

// export dos modulos para serem utilizadas em outros arquivos
module.exports = {
  login,
  signup,
  validateToken
}