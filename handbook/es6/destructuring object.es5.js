var httpResponse = {
  status: 200,
  statusText: 'OK',
  responseText: 'Hello World !',
  headers: {
    'content-type': 'text/plain'
  }
}
var status = httpResponse.status
var responseText = httpResponse.responseText
var properties = /* clone & delete unwanted properties */{}
console.log(status) // 200
console.log(responseText) // Hello World !
console.log(properties) // { statusText: "OK", headers: {...} }
