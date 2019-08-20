'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function (folderPath, output, end) {
  fs.readdirSync(folderPath).forEach(name => {
    const subPath = path.join(folderPath, name)
    try {
      const stat = fs.statSync(subPath)
      output(name, stat)
    } catch (e) {
      output(subPath, { error: e })
    }
  })
  end()
}
