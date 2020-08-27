function isSimple(type) {
  const SIMPLE_TYPES = [
    'boolean',
    'undefined',
    'number',
    'string',
    'symbol',
    'bigint',
  ]
  return SIMPLE_TYPES.includes(type)
}

function objDeepEqual(a, b) {
  if (a === null || b === null) {
    return a === b
  }
  if (typeof a === typeof b) {
    if (isSimple(typeof a)) {
      return a === b
    }
    if (typeof a === 'object') {
      // array
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
          return a.every((item, index) => objDeepEqual(item, b[index]))
        }
        return false
      }
      // map
      if (a instanceof Map && b instanceof Map) {
        if (a.size !== b.size) {
          return false
        }
        return true
      }
      // other objects
      return Object.keys(a).every(
        (key) =>
          Object.prototype.hasOwnProperty.call(b, key) &&
          objDeepEqual(a[key], b[key])
      )
    }
    // functions
    if (typeof a === 'function') {
      return a === b
    }
  }
  return a === b
}

module.exports = {
  isSimple,
  objDeepEqual,
}
