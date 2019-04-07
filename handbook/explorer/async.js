const server = require('./server')
const fs = require('fs')
const path = require('path')

// Return true if folder
function writeInfo (response, requestedPath, requestedStat) {
  const name = path.basename(requestedPath)
  if (!requestedStat) {
    response.write(`${name} ?\n`)
    return false
  }
  if (requestedStat.isDirectory()) {
    response.write(`${name}\\\n`)
    return true
  }
  response.write(`${name.padEnd(40, '.')} ${requestedStat.size.toString().padStart(10, ' ')}\n`)
  return false
}

server.run((requestedPath, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain')
  response.write(requestedPath)
  response.write('\n')
  fs.stat(requestedPath, (err, requestedStat) => {
    if (err) {
      writeInfo(response, requestedPath)
      response.end()
      return
    }
    if (writeInfo(response, requestedPath, requestedStat)) {
      fs.readdir(requestedPath, (err, names) => {
        if (err) {
          response.write('unable to read folder')
          response.end()
          return
        }
        let count = 0
        names.forEach(name => {
          const subPath = path.join(requestedPath, name)
          fs.stat(subPath, (err, subStat) => {
            if (err) {
              writeInfo(response, subPath)
            } else {
              writeInfo(response, subPath, subStat)
            }
            if (++count === names.length) {
              response.end()
            }
          })
        })
      })

    }
  })
})
