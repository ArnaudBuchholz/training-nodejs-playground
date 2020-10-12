'use strict'

const cluster = require('cluster')
const os = require('os')
const serve = require('./serve')

if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  for (let i = 0; i < cpuCount; ++i) {
    cluster.fork()
  }
} else {
  serve()
}

cluster.on('exit', function (worker) {
  console.log(`Worker ${worker.id} died`)
  console.log('Staring a new one...')
  cluster.fork()
})
