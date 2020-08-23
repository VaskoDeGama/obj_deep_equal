function isSimple(type) {
  const SIMPLE_TYPES = ['boolean', 'undefined', 'number', 'string', 'symbol']
  return SIMPLE_TYPES.includes(type)
}

function objDeepEqual(a, b) {
  if (isSimple(typeof a) && isSimple(typeof b)) {
    return a === b
  }
  return a === b
}

module.exports = {
  isSimple,
  objDeepEqual,
}
