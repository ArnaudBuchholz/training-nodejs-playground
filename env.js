const path = require('path')

module.exports = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  })
  response.end(JSON.stringify({
    dirname: __dirname,
    sep: path.sep
  }))
}
