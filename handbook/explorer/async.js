const server = require('./server')
const fs = require('fs')
const path = require('path')

server.run((requestedPath, output, end) => {
  fs.readdir(requestedPath, (err, names) => {
    if (err) {
      output('', err)
      return end()
    }
    let count = 0
    names.forEach(name => {
      const subPath = path.join(requestedPath, name)
      fs.stat(subPath, (err, subStat) => {
        if (err) {
          output(subPath, { error: err })
        } else {
          output(subPath, subStat)
        }
        if (++count === names.length) {
          end()
        }
      })
    })
  })
})
