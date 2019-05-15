const server = require('./server')

server.run((folderPath, output, end) => {
  output(folderPath, {
    error: 'This is an error'
  })
  end()
})
