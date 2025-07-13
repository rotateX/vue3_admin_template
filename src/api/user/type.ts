// 登录接口需要携带的参数ts类型
export interface loginForm {
  username: string,
  password: string
}

// 登录接口返回的类型
export interface loginResponseData {
  code?: number,
  data?: string,
  message?: string,
  ok?: boolean
}

interface user {
  name: string,
  routes: string[],
  buttons: string[],
  roles: string[],
  avatar: string
}

// 服务器返回用户信息相关类型
export interface userResponseData {
  code?: number,
  data?: user,
  message?: string,
  ok?: boolean
}