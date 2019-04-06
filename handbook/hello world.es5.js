var http = require('http')
var hostname = '127.0.0.1'
var port = 3000
// Callback is triggered for every request
const server = http.createServer(function (request, response) {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain')
  response.end('Hello World\n')
})
// Callback is triggered when server is ready
server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/')
})
