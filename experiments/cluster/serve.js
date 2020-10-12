'use strict'

const { log, serve } = require('reserve')

module.exports = () => log(serve({
  port: 8080,
  mappings: [{
    match: '^/$',
    custom: (request, response) => new Promise(resolve => {
      response.writeHead(200, {
        'content-type': 'text/plain'
      })
      response.write('begin\n')
      setTimeout(() => {
        response.end('end')
        resolve()
      }, 1000)
    })
  }, {
    match: '^/load.html',
    file: 'load.html'
  }]
}))
