const server = require('./server')

server.run((filePath, output, end) => {
  output(filePath, {
      isDirectory: () => false,
      size: 1
  })
  end()
})
