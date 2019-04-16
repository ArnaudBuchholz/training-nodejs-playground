var fibonacci = [1, 2, 3, 5, 8]
var object = {
  output: function (text) {
    console.log(text)
  },
  list: function (array) {
    array.forEach(function (value) {
      this.output(value)
    }, this)
  }
}
object.list(fibonacci)
