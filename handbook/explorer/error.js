const server = require('./server')

server.run((filePath, output, end) => {
  output(filePath, {
    error: 'This is an error'
  })
  end()
})
