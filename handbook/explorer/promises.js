const server = require('./server')
const fs = require('fs')
const path = require('path')

server.run((requestedPath, output, end) => {
  fs.readdir(requestedPath, (err, names) => {
    if (err) {
      output('', err)
      return end()
    }
    Promise.all(names.map(name => new Promise(resolve => {
      const subPath = path.join(requestedPath, name)
      fs.stat(subPath, (err, subStat) => {
        if (err) {
          resolve({
            subPath,
            subStat: {
              error: err
            }
          })
        } else {
          resolve({ subPath, subStat })
        }
      })
    }))).then(results => results.forEach(result => {
      output(result.subPath, result.subStat)
    })).then(end)
  })
})
