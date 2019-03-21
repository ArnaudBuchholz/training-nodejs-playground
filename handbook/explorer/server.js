const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

module.exports = {

  run: callback => {
    const server = http.createServer((request, response) => {
      try {
        callback(request.url.split('/?')[1], response)
      } catch (e) {
        response.statusCode = 500
        response.setHeader('Content-Type', 'text/plain')
        response.end(e.stack)
      }
    })

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`)
    })
  }
}
