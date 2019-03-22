const server = require('./server')
const fs = require('fs')
const path = require('path')

function safeStatSync (requestedPath) {
  try {
    return fs.statSync(requestedPath)
  } catch (e) {
    console.error(requestedPath, e)
  }
}

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
  const requestedStat = safeStatSync(requestedPath)
  if (writeInfo(response, requestedPath, requestedStat)) {
    fs.readdirSync(requestedPath).forEach(name => {
      const subPath = path.join(requestedPath, name)
      writeInfo(response, subPath, safeStatSync(subPath))
    })
  }
  response.end()
})
