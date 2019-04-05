var statuses = {
  200: 'OK',
  201: 'Created'
  /* ... */
}
var rawResponse = {
  status: 200,
  responseText: 'Hello World !'
}
var myResponse = Object.assign({
  statusText: statuses[rawResponse.status]
}, rawResponse)
console.log(myResponse) // { statusText: "OK", status: 200, ... }
