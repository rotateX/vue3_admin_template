import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData, userResponseData } from '@/api/user/type'

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
  return { token, menuRoutes, userLogin }
})


export default useUserStore
