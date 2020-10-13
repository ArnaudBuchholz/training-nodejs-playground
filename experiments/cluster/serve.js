'use strict'

const { log, serve } = require('reserve')
const process = require('process')

console.log(`This process is pid ${process.pid}`)

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
    match: '^/kill',
    custom: () => process.exit(0)
  }, {
    match: '^/terminate',
    custom: () => process.send({
      cmd: 'terminate'
    })
  }, {
    match: '^/(.*)',
    file: '$1'
  }]
}))
