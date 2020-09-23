const { isSimple } = require('../src/objDeepEqual.js')

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
    const result = isSimple('s')
    expect(result).toBeBoolean()
  })
  test('should return false if null', () => {
    const result = isSimple(null)
    expect(result).toBeFalsy()
  })
  describe('will be true with simple types', () => {
    test('should return true if str', () => {
      const result = isSimple('str')
      expect(result).toBeTruthy()
    })
    test('should return true if number', () => {
      const result = isSimple(1)
      expect(result).toBeTruthy()
    })
    test('should return true if boolean', () => {
      const result = isSimple(true)
      expect(result).toBeTruthy()
    })
    test('should return true if undefined', () => {
      const result = isSimple(undefined)
      expect(result).toBeTruthy()
    })
    test('should return true if Bigint', () => {
      const result = isSimple(123n)
      expect(result).toBeTruthy()
    })
    test('should return true if symbol', () => {
      const result = isSimple(Symbol('a'))
      expect(result).toBeTruthy()
    })
  })
})
