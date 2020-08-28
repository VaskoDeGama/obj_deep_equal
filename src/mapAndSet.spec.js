const { all, isInMap } = require('./objDeepEqual.js')

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

describe('isIn:', () => {
  let testMap = null
  beforeAll(() => {
    testMap = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ])
  })

  test('should be defined', () => {
    expect(isInMap).toBeDefined()
  })
  test('should return function', () => {
    expect(typeof isInMap(testMap)).toBe('function')
  })
  describe('returned function:', () => {
    test('should be return false with testMap and 4', () => {
      expect(isInMap(testMap)(4, 'four')).toBeFalsy()
    })
    test('should be return true with testMap and 1', () => {
      expect(isInMap(testMap)(1, 'one')).toBeTruthy()
    })
  })
})

describe('all:', () => {
  let testMap = null
  let notEqualMap = null
  let equalMap = null
  beforeAll(() => {
    testMap = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ])
    notEqualMap = new Map([
      [1, '1'],
      [4, 'two'],
      [3, 'three'],
    ])
    equalMap = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ])
  })

  test('should be defined', () => {
    expect(all).toBeDefined()
  })
  test('should return boolean', () => {
    expect(all(testMap, isInMap(testMap))).toBeBoolean()
  })
  test('should be return false with testMap and notEqualMap', () => {
    expect(all(testMap, isInMap(notEqualMap))).toBeFalsy()
  })
  test('should be return true with testMap and equalMap', () => {
    expect(all(testMap, isInMap(equalMap))).toBeTruthy()
  })
})
