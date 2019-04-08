const server = require('./server')

server.run((filePath, output) => {
  output(filePath, {
      isDirectory: () => false,
      size: 1
  })
})
