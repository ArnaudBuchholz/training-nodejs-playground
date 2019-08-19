'use strict'

const fs = require('fs')
const path = require('path')

function sync (folderPath, output, end) {
  fs.readdirSync(folderPath).forEach(name => {
    const subPath = path.join(folderPath, name)
    try {
      const stat = fs.statSync(subPath)
      output(subPath, stat)
    } catch (e) {
      output(subPath, { error: e })
    }
  })
  end()
}

module.exports = require('./custom')(sync)
