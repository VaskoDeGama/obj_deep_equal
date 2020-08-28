const { getNotPrimitiveType } = require('./objDeepEqual.js')

describe('getNotPrimitiveType:', () => {
  test('should be defined', () => {
    expect(getNotPrimitiveType).toBeDefined()
  })
  test('should return Map', () => {
    const test = new Map()
    const result = getNotPrimitiveType(test)
    expect(result).toEqual(Map)
  })
  test('should return WeakMap', () => {
    const test = new WeakMap()
    const result = getNotPrimitiveType(test)
    expect(result).toEqual(WeakMap)
  })
  test('should return Set', () => {
    const test = new Set()
    const result = getNotPrimitiveType(test)
    expect(result).toEqual(Set)
  })
  test('should return WeakSet', () => {
    const test = new WeakSet()
    const result = getNotPrimitiveType(test)
    expect(result).toEqual(WeakSet)
  })
  test('should return Function', () => {
    const test = () => {}
    const result = getNotPrimitiveType(test)
    expect(result).toEqual(Function)
  })
  test('should return Object', () => {
    const test = {}
    const result = getNotPrimitiveType(test)
    expect(result).toEqual(Object)
  })
  test('should return Array', () => {
    const test = []
    const result = getNotPrimitiveType(test)
    expect(result).toEqual(Array)
  })
})
