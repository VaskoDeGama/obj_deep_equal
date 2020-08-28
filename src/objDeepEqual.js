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

// Map
function isIn(obj) {
  return function check(key, value) {
    return obj.has(key) && obj.get(key) === value
  }
}

// check predicate for all entries in Map

function all(obj, predicate) {
  console.log(obj, predicate)
  for (const [key, value] of obj) {
    if (!predicate(key, value)) {
      return false
    }
  }
  return true
}

function objDeepEqual(a, b) {
  if (a === null || b === null) {
    return a === b
  }
  if (isSimple(typeof a) && isSimple(typeof b)) {
    return a === b
  }
  const notPrimitiveTypeA = getNotPrimitiveType(a)
  const notPrimitiveTypeB = getNotPrimitiveType(b)
  if (notPrimitiveTypeA === notPrimitiveTypeB) {
    switch (notPrimitiveTypeB) {
      case Map: {
        return a.size === b.size && all(a, isIn(b))
      }
      case WeakMap: {
        return false
      }
      case Set: {
        return false
      }
      case WeakSet: {
        return false
      }
      case Object: {
        return Object.keys(a).every(
          (key) =>
            Object.prototype.hasOwnProperty.call(b, key) &&
            objDeepEqual(a[key], b[key])
        )
      }
      case Function: {
        return a === b
      }
      default: {
        return a === b
      }
    }
  }

  return a === b
}

module.exports = {
  isSimple,
  objDeepEqual,
  getNotPrimitiveType,
  isIn,
  all,
}
