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

function getNotPrimitiveType(value) {
  if (typeof value === 'function') {
    return Function
  }
  const NOT_PRIMITIVE_TYPES = [Map, Set, WeakMap, WeakSet]
  const [result] = NOT_PRIMITIVE_TYPES.filter((type) => value instanceof type)
  return result || Object
}

function objDeepEqual(a, b) {
  if (a === null || b === null) {
    return a === b
  }
  if (isSimple(typeof a) || isSimple(typeof b)) {
    return a === b
  }
  return a === b
}

module.exports = {
  isSimple,
  objDeepEqual,
  getNotPrimitiveType,
}
