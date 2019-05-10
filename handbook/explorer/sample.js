const server = require('./server')

server.run((filePath, output, end) => {
  // output HTML will filePath and file information
  // (isDirectory() = true / false, size gives file size)
  output(filePath, {
    isDirectory: () => false,
    size: 1
  })
  end() // call when done
})
