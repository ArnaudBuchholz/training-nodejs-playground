'use strict'

module.exports = callback => {
  return function (request, response, folderPath) {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.write('[')
    return new Promise(resolve => {
      callback(folderPath, (itemPath, itemStat) => {
        if (itemStat.error) {
          response.write(JSON.stringify({
            path: itemPath,
            error: itemStat.error.toString()
          }))
        } else {
          response.write(JSON.stringify({
            path: itemPath,
            size: itemStat.size,
            isDirectory: itemStat.isDirectory()
          }))
        }
      }, () => {
        response.end(']')
        resolve()
      })
    })
      .catch(reason => {
        response.write(JSON.stringify({
          error: reason.toString()
        }))
        response.end(']')
        resolve()
      })
  }
}
