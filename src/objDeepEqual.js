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
  if (isSimple(typeof a) && isSimple(typeof b)) {
    return a === b
  }
  const notPrimitiveTypeA = getNotPrimitiveType(a)
  const notPrimitiveTypeB = getNotPrimitiveType(b)
  if (notPrimitiveTypeA === notPrimitiveTypeB) {
    switch (notPrimitiveTypeB) {
      case Map: {
        console.log('Map', a, b)
        break
      }
      case WeakMap: {
        console.log('WeakMap', a, b)
        break
      }
      case Set: {
        console.log('Set', a, b)
        break
      }
      case WeakSet: {
        console.log('WeakSet', a, b)
        break
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
}
