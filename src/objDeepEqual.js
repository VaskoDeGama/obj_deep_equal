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
 * Function should return not empty array, which contains entries of
 * passed object, where descriptors don't have "value" property
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
 * Compare property by descriptors
 * @param descriptorsKeyA
 * @param descriptorsKeyB
 * @returns {boolean}
 */

function compareByDescriptors(descriptorsKeyA, descriptorsKeyB) {
  return Reflect.ownKeys(descriptorsKeyA).every((key) => {
    return (
      Object.hasOwnProperty.call(descriptorsKeyB, key) &&
      objDeepEqual(descriptorsKeyA[key], descriptorsKeyB[key])
    )
  })
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
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return false
  }
  if (a === null || b === null) {
    return a === b
  }
  if (isSimple(a) && isSimple(b)) {
    return a === b
  }

  if (Object.getPrototypeOf(a) === Object.getPrototypeOf(b)) {
    if (Array.isArray(a)) {
      return a.every((value, index) => objDeepEqual(value, b[index]))
    }
    if (typeof a === 'function') {
      return a === b
    }
    const keysA = Reflect.ownKeys(a)
    const keysB = Reflect.ownKeys(b)
    if (keysB.length !== keysA.length) {
      return false
    }
    return keysA.every((key) => {
      return (
        Object.hasOwnProperty.call(b, key) &&
        compareByDescriptors(
          Object.getOwnPropertyDescriptor(a, key),
          Object.getOwnPropertyDescriptor(b, key)
        )
      )
    })
  }
  return false
}

module.exports = {
  isSimple,
  objDeepEqual,
  isHaveGetSet,
  compareByDescriptors,
}
