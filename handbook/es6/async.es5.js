function getResultAfter1second () {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve('resolved') }, 1000)
  })
}

function asyncCall () {
  console.log('calling')
  return getResultAfter1second().then(function (result) {
    console.log(result) // resolved
  }).then(function () { return 'done' })
}

asyncCall().then(function (message) { console.log(message) })
