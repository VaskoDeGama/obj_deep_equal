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
  if (typeof a === typeof b) {
    if (isSimple(typeof a)) {
      return a === b
    }
  }

  return a === b
}

module.exports = {
  isSimple,
  objDeepEqual,
}
