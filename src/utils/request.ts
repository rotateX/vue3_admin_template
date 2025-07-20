import axios from "axios";
import { ElMessage } from "element-plus";
// axios二次封装 使用请求与响应拦截器

// 1 创建axios实例
let request = axios.create({
  // 配置基础路径
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // 超时时间
})

// 2 request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  const token = localStorage.getItem('TOKEN')
  if (token) {
    config.headers['token'] = token
  }
  // 返回配置对象
  return config
})

// 3 配置响应拦截器
request.interceptors.response.use(
  // 成功回调
  (response) => {
    // 如果是文件流，直接返回
    if (response.config.responseType === 'arraybuffer') {
      return response
    }
    return response.data
  },

  // 失败回调 处理http网络错误
  (error) => {
    //  定义一个变量 存储网络错误信息
    let message = ''

    // http状态码
    let status = error.response.status

    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break;
      case 403:
        message = '无权访问'
        break;
      case 404:
        message = '请求地址错误'
        break;
      case 500:
        message = '服务器内部错误'
        break;
      default:
        message = "网络问题"
        break;
    }
    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(error)
  }
)

export default request
