// 统一管理项目用户相关的接口

import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData } from './type'

enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
}

// 暴露请求函数

// 登录接口方法
export const reqLogin = (data: loginForm) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userResponseData>(API.USERINFO_URL)
}