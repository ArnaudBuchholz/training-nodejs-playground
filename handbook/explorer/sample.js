const server = require('./server')

server.run((filePath, output, end) => {
  // output HTML with file path and information
  // (isDirectory() = true / false, size = file size)
  output(filePath, {
    isDirectory: () => false,
    size: 1
  })
  end() // call when done
})
