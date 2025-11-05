export interface Tango {
  id: number
  kana: string
  text: string
  type: string[]
  translates: string[]
  unit: string
}

export interface TangoState {
  /** 单词数据 */
  data: Tango[]
  /** 词库状态 */
  ready: boolean
  /** 词库版本 */
  version: string
}
