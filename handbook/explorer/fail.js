const server = require('./server')

server.run((requestedPath, response) => {
  throw new Error('FAIL')
})
