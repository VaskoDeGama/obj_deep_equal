function isSimple(type) {
  const SIMPLE_TYPES = ['boolean', 'undefined', 'number', 'string']
  return SIMPLE_TYPES.includes(type)
}

function objDeepEqual(a, b) {
  if (typeof a === typeof b) {
    if (isSimple(typeof a)) {
      return a === b
    }
    if (typeof a === 'symbol') {
      /* the comparison is incorrect because each symbol contains
      a unique value even if the description is the same */
      return a.toString() === b.toString()
    }
  }
  /*
  return true if obj without methods, nested
  objects and if the order of properties is the same
   */
  return JSON.stringify(a) === JSON.stringify(b)
}

module.exports = {
  isSimple,
  objDeepEqual,
}
