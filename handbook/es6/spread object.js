const statuses = {
  200: 'OK',
  201: 'Created'
  /* ... */
}
const rawResponse = {
  status: 200,
  responseText: 'Hello World !'
}
const myResponse = {
  statusText: statuses[rawResponse.status],
  ...rawResponse
}
console.log(myResponse) // { statusText: "OK", status: 200, ... }
