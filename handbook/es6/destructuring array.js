const fibonacci = [1, 2, 3, 5, 8]
const [first, second, ...rest] = fibonacci
console.log(first) // 1
console.log(second) // 2
console.log(rest) // [3, 5, 8]
