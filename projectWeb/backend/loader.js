const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server  = express()


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.listen(port, function() {
  console.log("escultado...");
})

//teste do loader
server.use((req, res, next) => {
    res.send('funcionou')
})
