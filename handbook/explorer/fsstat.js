const server = require('./server')
const fs = require('fs')

server.run((folderPath, output, end) => {
  output(folderPath, fs.statSync(folderPath))
  end()
})
