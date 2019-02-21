'use strict'

async function generateException () {
  throw new Error('fail')
}

async function generateRejected () {
  return Promise.reject(new Error('fail'))
}

async function main () {
  try {
    await generateException()
  } catch (e) {
    console.log('Exception caught: ' + e)
  }

  try {
    await generateRejected()
  } catch (e) {
    console.log('Rejection caught: ' + e)
  }
}

main()
