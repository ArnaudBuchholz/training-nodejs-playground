'use strict'

const fs = require('fs')
const path = require('path')

const loadedApis = {}

module.exports = async function (request, response, api, folderPath) {
  const apiPath = path.join(__dirname, api)
  const apiTimestamp = await fs.stat(apiPath).mtimeMs
  const cachedTimestamp = loadedApis[apiPath]
  if (cachedTimestamp !== apiTimestamp) {
    delete require.cache[apiPath]
    loadedApis[apiPath] = apiTimestamp
  }
  const apiModule = require(apiPath)

  response.writeHead(200, {
    'Content-Type': 'application/json'
  })
  response.write('[')
  return new Promise(resolve => {
    apiModule(folderPath, (itemPath, itemStat) => {
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
