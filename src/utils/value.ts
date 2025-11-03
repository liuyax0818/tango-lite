import dayjs from 'dayjs'

/**
 * 格式化时间为 `YYYY-MM-DD HH:mm:ss` 格式
 */
export function formatDate(val: any) {
  if (!dayjs(val).isValid()) {
    return '--'
  }

  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 根据位定时计算波特率
 * @param ubaud 位定时
 * @param clockMhz 时钟频率 (MHz)
 * @returns 计算得到的波特率
 */
export function calBaud(ubaud: number, clockMhz: number): number {
  // 提取 tsg1 = bits[16..19]
  const tsg1 = (ubaud >> 16) & 0xF

  // 提取 tsg2 = bits[20..22]
  const tsg2 = (ubaud >> 20) & 0x7

  // 提取 brp = bits[0..9]
  const brp = ubaud & 0x3FF

  // 波特率计算公式
  return (clockMhz * 1_000_000) / ((1 + (tsg1 + 1) + (tsg2 + 1)) * (brp + 1))
}

/** 格式化波特率 */
export function formatBaud(val: number): string {
  if (Number.isNaN(val) || val < 0) {
    return '0'
  }

  if (val < 1000000) {
    return `${Number((val / 1000).toFixed(2))}K`
  }

  return `${Number((val / 1000000).toFixed(2))}M`
}

/**
 * 判断是否为空值（`null`、`undefined`、`""`、`[]`、`{}`）
 * @param val 判断的值
 */
export function isEmpty(val: unknown): boolean {
  //  null 或 undefined
  if (val === null || val === undefined)
    return true

  // 空字符串
  if (typeof val === 'string' && val.trim() === '')
    return true

  // 数组
  if (Array.isArray(val) && val.length === 0)
    return true

  // 对象
  if (typeof val === 'object' && !Array.isArray(val)) {
    return Object.keys(val as Record<string, unknown>).length === 0
  }

  return false
}
