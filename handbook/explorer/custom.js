'use strict'

module.exports = callback => {
  return function (request, response, folderPath) {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.write('[')
    callback(folderPath, , () => response.end(']'))
  }
}
