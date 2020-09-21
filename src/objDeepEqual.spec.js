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

  describe('compare objects', () => {
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
    test('should be false if compare no same simple  objects ', () => {
      const obj1 = { a: 'str', c: 'abc' }
      const obj2 = { a: 'str' }
      const result = objDeepEqual(obj1, obj2)
      expect(result).toBeFalsy()
    })
    test('should be true if compare objects with same methods', () => {
      const method = () => {}
      const obj1 = { b: 2, a: 1, c: method }
      const obj2 = { a: 1, b: 2, c: method }
      const result = objDeepEqual(obj1, obj2)
      expect(result).toBeTruthy()
    })
    test('should be false if compare objects with not same methods', () => {
      const method = () => {}
      const method2 = () => {}
      const obj1 = { b: 2, a: 1, c: method }
      const obj2 = { a: 1, b: 2, c: method2 }
      const result = objDeepEqual(obj1, obj2)
      expect(result).toBeFalsy()
    })

    describe('getter/setter in object:', () => {
      test('should be false if compare objects with get/set', () => {
        const obj1 = {
          a: 2,
          _b: 0,
          get b() {
            return this._b + 11
          },
          set b(value) {
            this._b = value
          },
        }
        const obj2 = {
          a: 2,
          _b: 0,
          get b() {
            return this._b + 10
          },
          set b(value) {
            this._b = value + 100
          },
        }

        const result = objDeepEqual(obj1, obj2)
        expect(result).toBeFalsy()
      })
      test('should be true if compare objects with same get/set', () => {
        const getter = function () {
          return this._b + 10
        }
        const setter = function (value) {
          this._b = value
        }

        const obj1 = {
          a: 2,
          _b: null,
        }

        Object.defineProperty(obj1, 'b', {
          get: getter,
          set: setter,
        })

        const obj2 = {
          a: 2,
          _b: null,
        }
        Object.defineProperty(obj2, 'b', {
          get: getter,
          set: setter,
        })
        const result = objDeepEqual(obj1, obj2)
        expect(result).toBeTruthy()
      })
      test('descriptors', () => {
        const obj1 = {}
        const obj2 = {}
        Object.defineProperty(obj1, 'a', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: null,
        })

        Object.defineProperty(obj2, 'a', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null,
        })

        const result = objDeepEqual(obj1, obj2)
        expect(result).toBeFalsy()
      })
    })

    describe('symbols:', () => {
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
    })
  })

  // classes
  describe('classes:', () => {
    test('should be true if compare one instance of class', () => {
      class Person {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      const ivan = new Person('Ivan', 23)
      expect(objDeepEqual(ivan, ivan)).toBeTruthy()
    })

    test('should be false if compare two instance of one class', () => {
      class Person {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      const ivan = new Person('Ivan', 23)
      const oleg = new Person('Oleg', 23)
      expect(objDeepEqual(ivan, oleg)).toBeFalsy()
    })

    test('should be false if compare two instance of two class', () => {
      class Woman {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      class Man {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      const olga = new Woman('Olga', 23)
      const oleg = new Man('Oleg', 23)
      expect(objDeepEqual(olga, oleg)).toBeFalsy()
    })
    test('should be true if compare class constructor', () => {
      class Woman {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }
      expect(objDeepEqual(Woman, Woman)).toBeTruthy()
    })
    test('should be false if compare not same class constructor', () => {
      class Woman {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }

      class Man {
        constructor(personName, personAge) {
          this.name = personName
          this.age = personAge
        }

        get info() {
          return this.name
        }
      }
      expect(objDeepEqual(Woman, Man)).toBeFalsy()
    })
  })

  // function
  describe('functions:', () => {
    test('should be true if compare functions', () => {
      const method = () => {}
      const obj1 = method
      const obj2 = method
      const result = objDeepEqual(obj1, obj2)
      expect(result).toBeTruthy()
    })
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
  //recursion
  describe('compare with recursion', () => {
    test('ARRAYS of OBJ same', () => {
      const arr1 = Array.from({ length: 10 }, (a, k) => {
        return {
          a: k + 1,
        }
      })
      const arr2 = Array.from({ length: 10 }, (a, k) => {
        return {
          a: k + 1,
        }
      })
      const result = objDeepEqual(arr1, arr2)
      expect(result).toBeTruthy()
    })
    test('ARRAYS of OBJ not same', () => {
      const arr1 = Array.from({ length: 10 }, (a, k) => {
        return {
          a: k + 1,
        }
      })
      const arr2 = Array.from({ length: 9 }, (a, k) => {
        return {
          k: a + 1,
        }
      })
      const result = objDeepEqual(arr1, arr2)
      expect(result).toBeFalsy()
    })
    test('ARRAYS of deep OBJ same', () => {
      const symbolKey = Symbol('key')
      const arr1 = Array.from({ length: 9 }, (a, k) => {
        return {
          k: {
            obj: 'string',
            obj2: {
              k: 1 + 2,
              symbolKey: 'key',
            },
          },
        }
      })
      const func = () => {}
      arr1.forEach((item) => (item.k.obj2[symbolKey] = func))
      arr1.forEach((item) => (item.k.obj2['null'] = null))
      const arr2 = Array.from({ length: 9 }, (a, k) => {
        return {
          k: {
            obj: 'string',
            obj2: {
              k: 1 + 2,
              symbolKey: 'key',
            },
          },
        }
      })
      arr2.forEach((item) => (item.k.obj2[symbolKey] = func))
      arr2.forEach((item) => (item.k.obj2['null'] = null))
      const result = objDeepEqual(arr1, arr2)
      expect(result).toBeTruthy()
    })
    test('Big deep OBJ not same', () => {
      const obj1 = {
        data: {
          posts: [
            {
              id: 1,
              title: 'Post 1',
            },
            {
              id: 2,
              title: 'Post 2',
            },
            {
              id: 3,
              title: 'Post 3',
            },
          ],
          comments: [
            {
              id: 1,
              body: 'some comment',
              postId: 1,
            },
            {
              id: 2,
              body: 'some comment',
              postId: 1,
            },
          ],
          profile: {
            name: 'typicode',
          },
        },
      }
      const obj2 = {
        data: {
          posts: [
            {
              id: 1,
              title: 'Post 1',
            },
            {
              id: 2,
              title: 'Post 2',
            },
            {
              id: 3,
              title: 'Post 3',
            },
          ],
          comments: [
            {
              id: 1,
              body: 'some comment',
              postId: 2,
            },
            {
              id: 2,
              body: 'some comment',
              postId: 1,
            },
          ],
          profile: {
            name: 'typicode',
          },
        },
      }
      const result = objDeepEqual(obj1, obj2)
      expect(result).toBeFalsy()
    })
    test('OBJ By myself OBJ not same', () => {
      const obj1 = {}
      const obj2 = {}
      obj1.key = obj2
      obj2.key = obj1
      const result = objDeepEqual(obj1, obj2)
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
    test('should be false if NaN', () => {
      const type1 = NaN
      const type2 = 1
      const result = objDeepEqual(type1, type2)
      expect(result).toBeFalsy()
    })
  })
})
