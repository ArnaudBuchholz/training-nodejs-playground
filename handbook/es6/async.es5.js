function getResultAfter1second () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, 1000)
  })
}

function asyncCall () {
  console.log('calling')
  getResultAfter1second().then(function (result) {
    console.log(result) // resolved
  })
}

asyncCall()
