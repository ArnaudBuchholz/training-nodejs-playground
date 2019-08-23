'use strict'

const fs = require('fs')
const path = require('path')
const util = require('util')

const statAsync = util.promisify(fs.stat)
const apis = {}

async function load (api) {
  const filename = path.join(__dirname, api + '.js')
  const timestamp = (await statAsync(filename)).mtimeMs
  if (apis[filename] !== timestamp) {
    delete require.cache[filename]
    apis[filename] = timestamp
  }
  return require(filename)
}

module.exports = async function (request, response, api, folderPath, delay = 0) {
  const callback = await load(api)
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'x-api': api,
    'x-folderPath': folderPath,
    'x-delay': delay
  })
  response.write('[')
  let itemCount = 0
  function write (obj) {
    if (itemCount) {
      response.write(",")
    }
    response.write(JSON.stringify(obj))
    ++itemCount
    if (delay) {
      // Add synchronous delay per write
      const now = process.hrtime()
      while (process.hrtime(now)[1] / 1000000 < delay) {}
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"))
    }, 10000)
    callback(decodeURI(folderPath), (itemPath, itemStat) => {
      if (itemStat.error) {
        write({
          path: itemPath,
          error: itemStat.error.toString()
        })
      } else {
        write({
          path: itemPath,
          size: itemStat.size,
          isDirectory: itemStat.isDirectory()
        })
      }
    }, () => {
      response.end(']')
      resolve()
    })
  })
    .catch(reason => {
      write({
        error: reason.toString()
      })
      response.end(']')
      resolve()
    })
}
