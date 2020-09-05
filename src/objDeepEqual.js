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
 *
 * @param obj
 * @returns {[string, TypedPropertyDescriptor<*>][]}
 */
function isHaveGetSet(obj) {
  return Object.entries(Object.getOwnPropertyDescriptors(obj)).filter(
    ([, descriptor]) => {
      return Object.hasOwnProperty.call(descriptor, 'value')
    }
  )
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
    if (Array.isArray(a)) {
      return a.every((value, index) => value === b[index])
    }
    if (typeof a === 'function') {
      return a === b
    }
    const keysA = [
      ...Object.getOwnPropertyNames(a),
      ...Object.getOwnPropertySymbols(a),
    ]
    const keysB = [
      ...Object.getOwnPropertyNames(b),
      ...Object.getOwnPropertySymbols(b),
    ]
    if (keysB.length !== keysA.length) {
      return false
    }
    if (isHaveGetSet(b).length !== isHaveGetSet(a).length) {
      return false
    }

    return keysA.every((value) => a[value] === b[value])
  }
  return false
}

module.exports = {
  isSimple,
  objDeepEqual,
  isHaveGetSet,
}
