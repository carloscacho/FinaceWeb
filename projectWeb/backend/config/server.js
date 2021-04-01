const port = 3010

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');
const server = express()

// const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors(
    {
      origin: true,
      methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 200,
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
))
server.use(queryParser())

server.listen(process.env.PORT || port, function() {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server
