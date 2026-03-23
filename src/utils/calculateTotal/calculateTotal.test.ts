import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculateTotal' // 請根據你的實際檔案路徑調整

describe('calculateTotal', () => {
  // 正常情況
  it('正常逗號分隔的整數 → 應該正確加總', () => {
    expect(calculateTotal('10,20,30')).toBe(60)
    expect(calculateTotal('5, 15 , 25')).toBe(45)
  })

  it('支援小數', () => {
    expect(calculateTotal('12.5, 8.75, 3')).toBe(24.25)
    expect(calculateTotal('0.1,0.2,0.3')).toBeCloseTo(0.6, 10)  // 浮點數加總可能有微小誤差，使用 toBeCloseTo 來比較
  })

  it('支援換行符當作分隔', () => {
    expect(calculateTotal('100\n200\n300')).toBe(600)
    expect(calculateTotal('10\n 20 \n30')).toBe(60)
  })

  it('混合逗號與換行', () => {
    expect(calculateTotal('1,2\n3,4\n5')).toBe(15)
    expect(calculateTotal('10\n20,30\n40')).toBe(100)
  })

  // 空白與空項目處理
  it('有多餘空格、連續逗號、空項目 → 應該正確忽略', () => {
    expect(calculateTotal('  42  ')).toBe(42)
    expect(calculateTotal(',,10,,20, ,30,,')).toBe(60)
    expect(calculateTotal('10, , ,20')).toBe(30)
    expect(calculateTotal('\n\n5\n\n\n10\n')).toBe(15)
  })

  it('完全空白或空字串 → 返回 0', () => {
    expect(calculateTotal('')).toBe(0)
    expect(calculateTotal('   ')).toBe(0)
    expect(calculateTotal('\n\n')).toBe(0)
    expect(calculateTotal(',,,')).toBe(0)
  })

  // 無效輸入 → 只要有一個無法解析成數字，就返回 0
  it('包含無效數字 → 返回 0', () => {
    expect(calculateTotal('10,abc,30')).toBe(0)
    expect(calculateTotal('123, 45.6, hello')).toBe(0)
    expect(calculateTotal('NaN')).toBe(0)
    expect(calculateTotal('Infinity')).toBe(0)
    expect(calculateTotal('10, 20, --5')).toBe(0)
  })

  it('全部都是無效項目 → 返回 0', () => {
    expect(calculateTotal('abc,def,ghi')).toBe(0)
    expect(calculateTotal('---,+++')).toBe(0)
  })

  it('負數正常處理', () => {
    expect(calculateTotal('-10, 20, -5')).toBe(5)
    expect(calculateTotal('-1.5\n-2.5\n4')).toBe(0)
  })

  // 表格測試（推薦用在這種有多種輸入輸出的函數）
  it.each([
    ['5', 5],
    ['5,10', 15],
    ['1.1, 2.2, 3.3', 6.6],
    ['10\n20\n30', 60],
    ['  7  ,  ,  8  ', 15],
    ['', 0],
    ['invalid', 0],
    ['10,20,NaN', 0],
    ['-100,50,-25', -75],
  ])('輸入 %s → 預期輸出 %s', (input, expected) => {
    expect(calculateTotal(input)).toBe(expected)
  })
})