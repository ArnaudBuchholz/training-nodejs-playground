class FlexArray extends Array {
  same () {
    for (const item in this) {
      if (typeof this[item] !== typeof this[0]) {
        return false
      }
    }
    return true
  }
}

const flex = new FlexArray()
flex.push(1, 2, 3, '4')
console.log(flex)
console.log(flex instanceof Array)

const mappedFlex = flex.map(value => value * 2)
console.log(mappedFlex)
const slicedFlex = [].slice.call(mappedFlex)
console.log(slicedFlex)
console.log(mappedFlex.constructor)
console.log(new Array(...mappedFlex))

class PlexArray extends FlexArray {
  static get [Symbol.species] () {
    return Array
  }
}

const plex = new PlexArray()
plex.push(1, 2, 3, '4')
console.log(plex)
console.log(plex instanceof Array)

const mappedPlex = plex.map(value => value * 2)
console.log(mappedPlex)
console.log(mappedPlex.constructor)
