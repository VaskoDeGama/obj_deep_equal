const { compareByDescriptors } = require('./objDeepEqual')

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

describe('descriptorsCompare', () => {
  test('will be define', () => {
    expect(compareByDescriptors).toBeDefined()
  })
  test('do return boolean.', () => {
    const obj = {}
    Object.defineProperties(obj, {
      a: {
        value: 10,
      },
      b: {
        set: (value) => value,
        get: () => this.b,
      },
    })
    const test = Object.getOwnPropertyDescriptors(obj)

    expect(compareByDescriptors(test, test)).toBeBoolean()
  })
  test('should be true if check, equal property.', () => {
    const obj = {}
    Object.defineProperties(obj, {
      a: {
        value: 10,
      },
      b: {
        set: (value) => value,
        get: () => this.b,
      },
    })
    const obj2 = {}
    Object.defineProperties(obj2, {
      a: {
        value: 10,
      },
      b: {
        set: (value) => value,
        get: () => this.b,
      },
    })
    const testA = Object.getOwnPropertyDescriptor(obj, 'a')
    const testB = Object.getOwnPropertyDescriptor(obj2, 'a')

    expect(compareByDescriptors(testA, testB)).toBeTruthy()
  })
  test('should be false if check, not equal property.', () => {
    const obj = {}
    Object.defineProperties(obj, {
      a: {
        value: 10,
        writable: true,
      },
      b: {
        set: (value) => value,
        get: () => this.b,
      },
    })
    const obj2 = {}
    Object.defineProperties(obj2, {
      a: {
        value: 10,
        enumerable: true,
      },
      b: {
        set: (value) => value,
        get: () => this.b,
      },
    })
    const testA = Object.getOwnPropertyDescriptor(obj, 'a')
    const testB = Object.getOwnPropertyDescriptor(obj2, 'a')

    expect(compareByDescriptors(testA, testB)).toBeFalsy()
  })
  test('should be false if check, not equal property with not same length.', () => {
    const obj = {}
    Object.defineProperties(obj, {
      a: {
        value: 10,
        writable: true,
      },
      b: {
        set: (value) => value,
        get: () => this.b,
      },
    })
    const obj2 = {}
    Object.defineProperties(obj2, {
      a: {
        value: 10,
        enumerable: true,
      },
      b: {
        value: 15,
      },
    })
    const testA = Object.getOwnPropertyDescriptor(obj, 'a')
    const testB = Object.getOwnPropertyDescriptor(obj2, 'a')

    expect(compareByDescriptors(testA, testB)).toBeFalsy()
  })
})
