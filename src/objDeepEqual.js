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
 * @param scopeA
 * @param scopeB
 * @param level
 * @returns {boolean}
 */

function compareByDescriptors(
  descriptorsKeyA,
  descriptorsKeyB,
  scopeA,
  scopeB,
  level
) {
  return Reflect.ownKeys(descriptorsKeyA).every((key) => {
    return (
      Object.hasOwnProperty.call(descriptorsKeyB, key) &&
      objDeepEqual(
        descriptorsKeyA[key],
        descriptorsKeyB[key],
        scopeA,
        scopeB,
        level
      )
    )
  })
}

/**
 * Deep comparison function
 * Map,Set,Date = compares by instanceof and value
 * WeakMap,WeakSet,Function, = compares by link
 * @param a
 * @param b
 * @param scopeA
 * @param scopeB
 * @param level
 * @returns {boolean}
 */

function objDeepEqual(a, b, scopeA = new Map(), scopeB = new Map()) {
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
      return a.every((value, index) =>
        objDeepEqual(value, b[index], scopeA, scopeB)
      )
    }
    if (typeof a === 'function') {
      return a === b
    }

    // dich
    const scopeLevelA = scopeA.get(a)
    const scopeLevelB = scopeB.get(b)

    if (!scopeLevelA) {
      scopeA.set(a, scopeA.size)
    }

    if (!scopeLevelB) {
      scopeB.set(b, scopeB.size)
    }

    if (scopeLevelA && scopeLevelB) {
      return scopeLevelA === scopeLevelB
    }

    if (scopeA.size !== scopeB.size) {
      return false
    }

    // --------------------------

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
          Object.getOwnPropertyDescriptor(b, key),
          scopeA,
          scopeB
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
