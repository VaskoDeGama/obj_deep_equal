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
function isInMap(obj) {
  return function checkMap(key, value) {
    return obj.has(key) && obj.get(key) === value
  }
}

function isInSet(obj) {
  return function checkSet(val) {
    return obj.has(val)
  }
}

// check predicate for all entries Map, Set

function all(obj, predicate) {
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
        return a.size === b.size && all(a, isInMap(b))
      }
      case WeakMap: {
        return a.size === b.size && all(a, isInMap(b))
      }
      case Set: {
        return a.size === b.size && all(a, isInSet(b))
      }
      case WeakSet: {
        return a.size === b.size && all(a, isInSet(b))
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
  isInMap,
  isInSet,
  all,
}
