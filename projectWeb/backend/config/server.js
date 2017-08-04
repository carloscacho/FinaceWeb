const port = 5003

const bodyParser = require('body-parser')
const express = require('express')
const server  = express()


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.listen(port, function() {
  console.log("escultado...");
})


module.exports = server;
