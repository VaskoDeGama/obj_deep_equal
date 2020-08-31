/**
 * isSimple checks if the passed type is simple
 * @param type - typeof
 * @returns {boolean}
 */
const SIMPLE_TYPES = [
  'boolean',
  'undefined',
  'number',
  'string',
  'symbol',
  'bigint',
]

function isSimple(type) {
  return SIMPLE_TYPES.includes(type)
}

/**
 * getNotPrimitiveType define the type of the passed variable
 * @param value
 * @returns {Function|Map|Set|WeakMap|WeakSet|Array|Object}
 */
function getNotPrimitiveType(value) {
  if (typeof value === 'function') {
    return Function
  }
  const NOT_PRIMITIVE_TYPES = [Map, Set, WeakMap, WeakSet, Array, Date]
  const [result] = NOT_PRIMITIVE_TYPES.filter((type) => value instanceof type)
  return result || Object
}

/**
 * isInMap, check for a key-value pair in the checked Map
 * @param obj = Map
 * @returns {function(*=, *): *}
 */
function isInMap(obj) {
  return function checkMap(key, value) {
    return obj.has(key) && obj.get(key) === value
  }
}

/**
 * isInSet, check for a key-value pair in the checked Set
 * @param obj = Set
 * @returns {function(*=): *}
 */
function isInSet(obj) {
  return function checkSet(val) {
    return obj.has(val)
  }
}

/**
 *  all, check predicate for all key-value pairs in object
 * @param obj
 * @param predicate = function, will be return true || false
 * @returns {boolean}
 */
function all(obj, predicate) {
  for (const [key, value] of obj) {
    if (!predicate(key, value)) {
      return false
    }
  }
  return true
}

/**
 * Deep comparison function
 * Map,Set,Date = compares by instanceof and value
 * WeakMap,WeakSet,Function, = compares by link
 * @param a
 * @param b
 * @returns {boolean}
 */

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
      case Set: {
        return a.size === b.size && all(a, isInSet(b))
      }
      case Date: {
        return a.getTime() === b.getTime()
      }
      case Array: {
        return (
          a.length === b.length && a.every((item, index) => item === b[index])
        )
      }
      case Object: {
        const keysA = [
          ...Object.getOwnPropertySymbols(a),
          ...Object.getOwnPropertyNames(a),
        ]
        const keysB = [
          ...Object.getOwnPropertySymbols(b),
          ...Object.getOwnPropertyNames(b),
        ]
        if (keysA.length === keysB.length) {
          return keysA.every(
            (key) =>
              Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key]
          )
        }
        return false
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
