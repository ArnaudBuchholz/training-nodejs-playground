const server = require('./server')

server.run(() => {
  throw new Error('FAIL')
})
