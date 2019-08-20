const fs = require('fs')

module.exports = (folderPath, output, end) => {
  output(folderPath, fs.statSync(folderPath))
  end()
}
