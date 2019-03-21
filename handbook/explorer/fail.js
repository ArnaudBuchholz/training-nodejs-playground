const server = require('./server')

server.run((path, response) => {
  throw new Error('FAIL')
})
