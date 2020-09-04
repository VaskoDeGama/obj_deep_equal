/**
 * isSimple checks if the passed value is simple
 * @param value
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

function isSimple(value) {
  return SIMPLE_TYPES.includes(typeof value)
}

/**
 * getNotPrimitiveType define the type of the passed variable
 * @param value
 * @returns {Function|Map|Set|WeakMap|WeakSet|Array|Object}
 */
function getNotPrimitiveType(value) {
  return value.constructor
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
  if (isSimple(a) && isSimple(b)) {
    return a === b
  }
  if (Object.getPrototypeOf(a) === Object.getPrototypeOf(b)) {
    console.log('Prototype A', Object.getPrototypeOf(a))
    console.log('Prototype B', Object.getPrototypeOf(b))
  }
  return false
}

module.exports = {
  isSimple,
  objDeepEqual,
  getNotPrimitiveType,
  isInMap,
  isInSet,
  all,
}
