import router from "./router";
import useUserStore from "@/store/modules/user";
import nprogress from 'nprogress' // 进度条
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false })
const allowList = ['404', 'Any'] //免登录名单

// 前置守卫
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const token = localStorage.getItem("TOKEN")
  const userStore = useUserStore()
  // 只要在白名单，直接放行
  if (typeof to.name === 'string' && allowList.includes(to.name)) {
    next()
    nprogress.done()
    return
  }
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      nprogress.done()
      return
    }
    // 有 token 但没用户信息，尝试获取
    if (!userStore.userInfo || Object.keys(userStore.userInfo).length === 0) {
      try {
        const res = await userStore.getUserInfo()
        if (res !== 'success') {
          await userStore.userLogout()
          next({ path: '/login' })
        } else {
          next()
        }
      } catch (err) {
        await userStore.userLogout()
        next({ path: '/login' })
      }
    } else {
      next()
    }
  } else {
    // 无 token
    // if (allowList.includes(to.name)) {
    //   next()
    // } else {
    //   next({ path: '/login', query: { redirect: to.fullPath } })
    // }
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})


/*
1、进度条 nprogress
2、路由鉴权
3、全部路由组件 登录｜404｜任意路由｜首页｜数据大屏｜权限管理（三个子路由 ｜商品管理（4个子路由
*/
