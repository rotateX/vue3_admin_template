import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginForm, loginResponseData, userResponseData, userInter } from '@/api/user/type'

import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { constantRoute } from '@/router/routes'
// const useUserStore = defineStore('User', {
//   state: () => {
//     return {
//       token: localStorage.getItem("TOKEN") || ''
//     }
//   },
//   actions: {
//     async userLogin(data: loginForm) {
//       const result = await reqLogin(data)
//       if (result.ok) {
//         this.token = result.data
//         // 本地存储
//         localStorage.setItem('TOKEN', result.data);
//         router.push({
//           path: '/'
//         })
//         return 'ok'
//       } else {
//         return Promise.reject(new Error(result.data))
//       }
//     }
//   },
//   getters: {

//   }
// })

const useUserStore = defineStore('User', () => {
  const token = ref('')
  token.value = localStorage.getItem("TOKEN") || ''
  const menuRoutes = reactive(constantRoute)
  // 获取用户信息
  const userInfo = ref<userInter | null>(null)

  function userLogin(data: loginForm) {
    return new Promise((resolve, reject) => {
      reqLogin(data).then((result: loginResponseData) => {
        if (result.ok) {
          token.value = result.data
          localStorage.setItem('TOKEN', result.data);
          resolve('success')
        } else {
          reject(result.message)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }


  function getUserInfo() {
    return new Promise((resolve, reject) => {
      reqUserInfo().then((res: userResponseData) => {
        if (res.ok) {
          userInfo.value = res.data
          resolve('success')
        } else {
          reject(res.message)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  // 退出登录
  function userLogout() {
    return new Promise((resolve, reject) => {
      reqLogout().then((res) => {
        if (res.ok) {
          userInfo.value = null
          localStorage.removeItem("TOKEN")
          token.value = ''
          resolve('success')
        } else {
          reject(res.message)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
  return { token, menuRoutes, userLogin, userInfo, getUserInfo, userLogout }
})


export default useUserStore
