const server = require('./server')

server.run((path, response) => {
  response.end(path)
})
