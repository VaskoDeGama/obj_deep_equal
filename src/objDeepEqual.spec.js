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
  test('should return false if null', () => {
    const result = isSimple(typeof null)
    expect(result).toBeFalsy()
  })
  describe('will be true with simple types', () => {
    test('should return true if str', () => {
      const result = isSimple(typeof 'str')
      expect(result).toBeTruthy()
    })
    test('should return true if  number', () => {
      const result = isSimple(typeof 1)
      expect(result).toBeTruthy()
    })
    test('should return true if  boolean', () => {
      const result = isSimple(typeof true)
      expect(result).toBeTruthy()
    })
    test('should return true if  undefined', () => {
      const result = isSimple(typeof undefined)
      expect(result).toBeTruthy()
    })
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
  test('should be true if compare object by itself', () => {
    const obj = {}
    const result = objDeepEqual(obj, obj)
    expect(result).toBeTruthy()
  })
  describe('compare simple same types', () => {
    test('should be true if same numbers', () => {
      const type1 = 1
      const type2 = 1
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be true if same strings', () => {
      const type1 = 'str'
      const type2 = 'str'
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be true if same undefined', () => {
      const type1 = undefined
      const type2 = undefined
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be true if same symbols', () => {
      const type1 = Symbol('a')
      const type2 = Symbol('a')
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
  })

  test('should be true if compare null', () => {
    const type1 = null
    const type2 = null
    const result = objDeepEqual(type1, type2)
    expect(result).toBeTruthy()
  })
  test('should be true if compare simple objects', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2 }
    const result = objDeepEqual(obj1, obj2)
    expect(result).toBeTruthy()
  })
  test('should be false if compare not simple objects', () => {
    const obj1 = { b: 2, a: 1 }
    const obj2 = { a: 1, b: 2 }
    const result = objDeepEqual(obj1, obj2)
    expect(result).toBeFalsy()
  })
})
