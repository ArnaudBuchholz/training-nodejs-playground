var fibonacci = [1, 2, 3, 5, 8]
console.log(fibonacci
  .reduce(function (sum, value) {
      return sum + value
  })
) // 19
