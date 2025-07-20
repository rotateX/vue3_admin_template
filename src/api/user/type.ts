// 登录接口需要携带的参数ts类型
export interface loginForm {
  username: string,
  password: string
}

// 定义全部接口返回的类型
export interface responseData {
  code?: number,
  message?: string,
  ok?: boolean
}

// 登录接口返回的类型
export interface loginResponseData extends responseData {
  data?: string
}
export interface logoutResponseData extends responseData {
  data?: string | null
}

export interface userInter {
  name: string,
  routes: string[],
  buttons: string[],
  roles: string[],
  avatar: string
}

// 服务器返回用户信息相关类型
export interface userResponseData extends responseData {
  data?: userInter
}
