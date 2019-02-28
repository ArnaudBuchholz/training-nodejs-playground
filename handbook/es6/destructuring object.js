const httpResponse = {
  status: 200,
  responseText: 'Hello World !',
  headers: {
    'content-type': 'text/plain'
  }
}
const { status, responseText, ...properties } = httpResponse
console.log(status) // 200
console.log(responseText) // Hello World !
console.log(properties) // { headers: ... }
