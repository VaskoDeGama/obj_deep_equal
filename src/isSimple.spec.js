const { isSimple } = require('./objDeepEqual.js')

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
    test('should return true if number', () => {
      const result = isSimple(typeof 1)
      expect(result).toBeTruthy()
    })
    test('should return true if boolean', () => {
      const result = isSimple(typeof true)
      expect(result).toBeTruthy()
    })
    test('should return true if undefined', () => {
      const result = isSimple(typeof undefined)
      expect(result).toBeTruthy()
    })
    test('should return true if Bigint', () => {
      const result = isSimple(typeof 123n)
      expect(result).toBeTruthy()
    })
    test('should return true if symbol', () => {
      const result = isSimple(typeof Symbol('a'))
      expect(result).toBeTruthy()
    })
  })
})
