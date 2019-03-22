const server = require('./server')

server.run((requestedPath, response) => {
  response.end(requestedPath)
})
