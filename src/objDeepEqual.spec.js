const { objDeepEqual } = require('./objDeepEqual.js')

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

describe('DeepEqual:', () => {
  test('should be defined', () => {
    expect(objDeepEqual).toBeDefined()
  })
  test('should return boolean', () => {
    const result = objDeepEqual({}, {})
    expect(result).toBeBoolean()
  })
  test('should be true if compare null', () => {
    const type1 = null
    const type2 = null
    const result = objDeepEqual(type1, type2)
    expect(result).toBeTruthy()
  })

  test('should be true if compare object by itself', () => {
    const obj = {}
    const result = objDeepEqual(obj, obj)
    expect(result).toBeTruthy()
  })
  test('should be true if compare simple objects', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2 }
    const result = objDeepEqual(obj1, obj2)
    expect(result).toBeTruthy()
  })
  test('should be false if compare no same simple  objects ', () => {
    const obj1 = { a: 'str', c: 'abc' }
    const obj2 = { a: 'str', c: 'ab' }
    const result = objDeepEqual(obj1, obj2)
    expect(result).toBeFalsy()
  })
  test('should be true if compare objects with methods', () => {
    const method = () => {}
    const obj1 = { b: 2, a: 1, c: method }
    const obj2 = { a: 1, b: 2, c: method }
    const result = objDeepEqual(obj1, obj2)
    expect(result).toBeTruthy()
  })

  test('should be true if compare objects with same Symbols key', () => {
    const key1 = Symbol('key1')
    const obj1 = {}
    obj1[key1] = 'key1'
    obj1.string = 'stringkey'
    const obj2 = {}
    obj2[key1] = 'key1'
    obj2.string = 'stringkey'
    expect(objDeepEqual(obj1, obj2)).toBeTruthy()
  })
  test('should be false if compare objects with not same Symbols key', () => {
    const key1 = Symbol('key1')
    const key2 = Symbol('key2')
    const obj1 = {}
    obj1[key1] = 'key1'
    obj1.string = 'stringkey'
    const obj2 = {}
    obj2[key2] = 'key2'
    obj2.string = 'stringkey'
    expect(objDeepEqual(obj1, obj2)).toBeFalsy()
  })

  // function
  test('should be true if compare functions', () => {
    const method = () => {}
    const obj1 = method
    const obj2 = method
    const result = objDeepEqual(obj1, obj2)
    expect(result).toBeTruthy()
  })

  // array
  describe('array:', () => {
    test('should be true if compare array', () => {
      const obj1 = ['str', null, 1]
      const obj2 = ['str', null, 1]
      const result = objDeepEqual(obj1, obj2)
      expect(result).toBeTruthy()
    })
    test('should be false if compare not same array', () => {
      const obj1 = ['str', null, 1]
      const obj2 = ['str', undefined, 1]
      const result = objDeepEqual(obj1, obj2)
      expect(result).toBeFalsy()
    })
  })

  // no typical types
  describe('not typical types', () => {
    test('should be true if compare same Map', () => {
      const type1 = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ])
      const type2 = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ])
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be false if compare notSame Map', () => {
      const type1 = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ])
      const type2 = new Map([
        [1, 'two'],
        [2, 'two'],
        [3, 'three'],
      ])
      const result = objDeepEqual(type1, type2)
      expect(result).toBeFalsy()
    })
    test('should be true if compare same Set', () => {
      const type1 = new Set('TestString')
      const type2 = new Set('TestString')
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be false if compare notSame Set', () => {
      const type1 = new Set('TestString')
      const type2 = new Set('test')
      const result = objDeepEqual(type1, type2)
      expect(result).toBeFalsy()
    })
    test('should be true if compare same WeakMap', () => {
      const key = { a: 1 }
      const value = 'value'
      const type1 = new WeakMap()
      type1.set(key, value)
      const type2 = type1
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be true if compare same WeakSet', () => {
      const value = { a: 1 }
      const type1 = new WeakSet()
      type1.add(value)
      const type2 = type1
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be true if compare same Date', () => {
      const type1 = new Date()
      const type2 = new Date()
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be false if compare not same Date', () => {
      const type1 = new Date()
      const type2 = new Date(type1 + 1)
      const result = objDeepEqual(type1, type2)
      expect(result).toBeFalsy()
    })
  })

  // simple type
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
      const type2 = type1
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be true if same boolean', () => {
      const type1 = true
      const type2 = true
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
    test('should be true if same BigInt', () => {
      const type1 = 123n
      const type2 = 123n
      const result = objDeepEqual(type1, type2)
      expect(result).toBeTruthy()
    })
  })
})
