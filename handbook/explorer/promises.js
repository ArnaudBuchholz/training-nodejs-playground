const fs = require('fs')
const path = require('path')
const util = require('util')

const readdirAsync = util.promisify(fs.readdir)
const statAsync = util.promisify(fs.stat)

module.exports = async (requestedPath, output, end) => {
  let names
  try {
    names = await readdirAsync(requestedPath)
  } catch (e) {
    output('', { error: e })
    return end()
  }
  for (var index = 0; index < names.length; ++index) {
    const subPath = path.join(requestedPath, names[index])
    try {
      output(subPath, await statAsync(subPath))
    } catch (e) {
      output(subPath, { error: e })
    }
  }
  end()
}
