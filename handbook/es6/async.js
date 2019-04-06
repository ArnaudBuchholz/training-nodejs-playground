const getResultAfter1second = () => new Promise(resolve => {
  setTimeout(() => resolve('resolved'), 1000)
})

async function asyncCall () {
  console.log('calling')
  console.log(await getResultAfter1second()) // resolved
  return 'done'
}

asyncCall().then(message => console.log(message))
