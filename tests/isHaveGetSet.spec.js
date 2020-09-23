const { isHaveGetSet } = require('../src/objDeepEqual')

describe('isHaveGetSet', () => {
  test('will be define', () => {
    expect(isHaveGetSet).toBeDefined()
  })
  test('do return array.', () => {
    expect(isHaveGetSet({})).toBeInstanceOf(Array)
  })
  test('return not empty arr if get obj with get/set, arr.length well be less entries arr ', () => {
    const obj = {
      a: 1,
      get b() {
        return this.a + 1
      },
    }
    expect(isHaveGetSet(obj).length).toBeLessThan(Object.entries(obj).length)
  })
  test('return not empty arr if get obj without get/set, arr.length well be equal entries arr', () => {
    const obj = {
      a: 1,
      b: 2,
    }
    expect(isHaveGetSet(obj).length).toEqual(Object.entries(obj).length)
  })
})
