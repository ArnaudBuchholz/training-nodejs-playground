'use strict'

const { get } = require('http')
const COUNT = 100
const NS_PER_SEC = 1e9

const getAsync = () => new Promise((resolve, reject) => {
  get('http://localhost:8080/', res => {
    if (res.statusCode !== 200) {
      reject(res)
    }
    const body = []
    res.on('data', chunk => body.push(chunk))
    res.on('end', () => resolve(body.join('')))
  })
})

const promises = []
console.log(`Submitting ${COUNT} requests...`)
const start = process.hrtime()
for (let index = 0; index < COUNT; ++index) {
  promises.push(getAsync())
}
console.log('Submitted.')
Promise.all(promises)
  .then(() => {
    const perf = process.hrtime(start)
    console.log(`Finished, took ${(perf[0] * NS_PER_SEC + perf[1]) / 1000000} ms`)
  })
