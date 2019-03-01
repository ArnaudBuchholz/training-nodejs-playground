function getResultAfter1second () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, 1000)
  })
}

async function asyncCall () {
  console.log('calling')
  console.log(await getResultAfter1second()) // resolved
}

asyncCall()
