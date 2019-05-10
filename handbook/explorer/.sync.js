const server = require('./server')
const fs = require('fs')
const path = require('path')

server.run((folderPath, output, end) => {
  fs.readdirSync(folderPath).forEach(name => {
    const subPath = path.join(folderPath, name)
    try {
      const stat = fs.statSync(subPath)
      output(subPath, stat)
    } catch (e) {
      output(subPath, { error: e })
    }
  })
  end()
})
