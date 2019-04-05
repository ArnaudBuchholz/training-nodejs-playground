const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
// Callback is triggered for every request
const server = http.createServer((request, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain')
  response.end('Hello World\n')
})
// Callback is triggered when server is ready
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
