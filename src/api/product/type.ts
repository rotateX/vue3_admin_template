export interface ResponseData {
  code: number,
  message: string | null,
  ok: boolean
}

// 已有的品牌数据类型
export interface TradeMark {
  id?: number,
  tmName?: string,
  logoUrl?: string,

}

// 品牌数据列表类型
export type Records = TradeMark[];

// 品牌数据列表返回的数据类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    current: number,
    pages: 1,
    records: Records,
    searchCount: boolean,
    size: number,
    total: number,
  }
}
