const http = require('http')
const path = require('path')
const hostname = '127.0.0.1'
const port = 3000

function writeInfo (response, filePath, fileStat) {
  const name = path.basename(filePath)
  if (fileStat.error) {
    response.write(`<tr><td>${name}</td><td><pre style="color: red;">${fileStat.error}</pre>`)
  } else if (fileStat.isDirectory()) {
    response.write(`<tr><td colspan="2"><a href=/?${filePath}>${name}\\</a></td>`)
  } else {
    response.write(`<tr><td>${name}</td><td>${fileStat.size.toString()}`)
  }
  response.write(`</td></tr>`)
}

module.exports = {

  run: callback => {
    const server = http.createServer((request, response) => {
      const now = new Date()
      function end () {
        response.end('</table></body></html>')
        console.log(`${request.url}: ${new Date() - now}ms`)
      }
      try {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')
        const requestedPath = request.url.split('/?')[1]
        if (requestedPath) {
          response.write(`<html><link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"><body><h1>${requestedPath}</h1><table border="0">`)
          callback(requestedPath, (filePath, fileStat) => writeInfo(response, filePath, fileStat), end)
        }
      } catch (e) {
        console.error(e.stack)
        response.write(`<tr><td colspan="2"><pre style="color: red;">${e.stack}</pre></td></tr>`)
        end()
      }
    })
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`)
    })
  }
}
