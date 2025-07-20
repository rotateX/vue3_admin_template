// 品牌管理接口

import request from "@/utils/request";
import { TradeMarkResponseData } from './type'

// 获取品牌列表
export const getTrademarkList = (data: any) => {
  return request.get<any, TradeMarkResponseData>(`/admin/product/baseTrademark/${data.page}/${data.limit}`)
}

// 增加品牌
export const addTrademark = (data) => {
  return request.post(`/admin/product/baseTrademark/save`, data)
}

// 更新品牌
export const updateTrademark = (data) => {
  return request.put(`/admin/product/baseTrademark/update`, data)
}

// 删除品牌
export const deleteTrademark = (id: number) => {
  return request.delete(`/admin/product/baseTrademark/remove/${id}`)
}

