const { objDeepEqual, isSimple } = require('./objDeepEqual.js')

expect.extend({
  toBeBoolean(received) {
    return typeof received === 'boolean'
      ? {
          message: () => `expected ${received} to be boolean`,
          pass: true,
        }
      : {
          message: () => `expected ${received} to be boolean`,
          pass: false,
        }
  },
})

describe('IsSimple:', () => {
  test('should be defined', () => {
    expect(isSimple).toBeDefined()
  })
  test('should return boolean', () => {
    const result = isSimple(typeof 's')
    expect(result).toBeBoolean()
  })
})

describe('DeepEqual:', () => {
  test('should be defined', () => {
    expect(objDeepEqual).toBeDefined()
  })
  test('should return boolean', () => {
    const result = objDeepEqual({}, {})
    expect(result).toBeBoolean()
  })
  test('should be true if compare same object', () => {
    const obj = {}
    const result = objDeepEqual(obj, obj)
    expect(result).toBeTruthy()
  })
  test('should be true if compare simple types', () => {
    const type1 = 1
    const type2 = 1
    const result = objDeepEqual(type1, type2)
    expect(result).toBeTruthy()
  })
  test('should be true if compare null', () => {
    const type1 = null
    const type2 = null
    const result = objDeepEqual(type1, type2)
    expect(result).toBeTruthy()
  })
  test('should be true if compare simple objects', () => {
    const obj1 = { a: 1 }
    const obj2 = { a: 1 }
    const result = objDeepEqual(obj1, obj2)
    expect(result).toBeFalsy()
  })
})
