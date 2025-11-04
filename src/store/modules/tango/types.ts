export interface Tango {
  id: number
  kana: string
  text: string
  type: string[]
  translates: string[]
  unit: string
}

export interface TangoState {
  data: Tango[]
}
