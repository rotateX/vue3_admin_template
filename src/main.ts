
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// 国际化配置
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import router from './router'

import pinia from './store'

// console.log(import.meta.env);


// 创建应用
const app = createApp(App)

// app.use(ElementPlus)
// 国际化配置
app.use(ElementPlus, {
  locale: zhCn,
})
// svg插件需要配置的
import 'virtual:svg-icons-register'

// 引入自定义插件对象  注册整个全局组件

import globalComponent from '@/components/index'

// 安装自定义插件
app.use(globalComponent)

// 引入模版全局样式
import '@/styles/index.scss'



app.use(router);

app.use(pinia)

// svg插件需要
app.mount('#app')
