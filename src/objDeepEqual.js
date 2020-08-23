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
      return Object.keys(a).every(
        (key) =>
          Object.prototype.hasOwnProperty.call(b, key) &&
          objDeepEqual(a[key], b[key])
      )
    }
  }
  return a === b
}

module.exports = {
  isSimple,
  objDeepEqual,
}
