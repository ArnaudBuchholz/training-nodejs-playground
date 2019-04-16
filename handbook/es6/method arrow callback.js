const fibonacci = [1, 2, 3, 5, 8]
const object = {
  output: text => console.log(text),
  list: function (array) {
    array.forEach(value => this.output(value))
  }
}
object.list(fibonacci)
