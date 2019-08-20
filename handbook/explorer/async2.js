'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (requestedPath, output, end) => {
  fs.readdir(requestedPath, (err, names) => {
    if (err) {
      output('', err)
      return end()
    }
    function next () {
        if (0 === names.length) {
            end()
            return
        }
        const name = names.shift()
        const subPath = path.join(requestedPath, name)
        fs.stat(subPath, (err, subStat) => {
          if (err) {
            output(subPath, { error: err })
          } else {
            output(subPath, subStat)
          }
          next()
        })
    }
    next()
  })
}
