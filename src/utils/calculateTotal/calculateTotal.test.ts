import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculateTotal' // 請根據你的實際檔案路徑調整

describe('calculateTotal', () => {
  // 正常情況
  it('正常逗號分隔的整數 → 應該正確加總', () => {
    expect(calculateTotal('10,20,30')).toBe(60n)
    expect(calculateTotal('5, 15 , 25')).toBe(45n)
  })

  it('支援換行符當作分隔', () => {
    expect(calculateTotal('100\n200\n300')).toBe(600n)
    expect(calculateTotal('10\n 20 \n30')).toBe(60n)
  })

  it('混合逗號與換行', () => {
    expect(calculateTotal('1,2\n3,4\n5')).toBe(15n)
    expect(calculateTotal('10\n20,30\n40')).toBe(100n)
  })

  // 空白與空項目處理
  it('有多餘空格、連續逗號、空項目 → 應該正確忽略', () => {
    expect(calculateTotal('  42  ')).toBe(42n)
    expect(calculateTotal(',,10,,20, ,30,,')).toBe(60n)
    expect(calculateTotal('10, , ,20')).toBe(30n)
    expect(calculateTotal('\n\n5\n\n\n10\n')).toBe(15n)
  })

  it('完全空白或空字串 → 返回 0', () => {
    expect(calculateTotal('')).toBe(0n)
    expect(calculateTotal('   ')).toBe(0n)
    expect(calculateTotal('\n\n')).toBe(0n)
    expect(calculateTotal(',,,')).toBe(0n)
  })

  // 無效輸入 → 只要有一個無法解析成數字，就返回 0
  it('包含無效數字 → 返回 0', () => {
    expect(calculateTotal('10,abc,30')).toBe(0n)
    expect(calculateTotal('123, 45.6, hello')).toBe(0n)
    expect(calculateTotal('NaN')).toBe(0n)
    expect(calculateTotal('Infinity')).toBe(0n)
    expect(calculateTotal('10, 20, --5')).toBe(0n)
  })

  it('全部都是無效項目 → 返回 0', () => {
    expect(calculateTotal('abc,def,ghi')).toBe(0n)
    expect(calculateTotal('---,+++')).toBe(0n)
  })

  it('負數正常處理', () => {
    expect(calculateTotal('-10, 20, -5')).toBe(20n)
  })

  // 表格測試（推薦用在這種有多種輸入輸出的函數）
  it.each([
    ['5', 5n],
    ['5,10', 15n],
    ['10\n20\n30', 60n],
    ['  7  ,  ,  8  ', 15n],
    ['', 0n],
    ['invalid', 0n],
    ['10,20,NaN', 0n],
    ['-100,50,-25', 50n],
  ])('輸入 %s → 預期輸出 %s', (input, expected) => {
    expect(calculateTotal(input)).toBe(expected)
  })
})