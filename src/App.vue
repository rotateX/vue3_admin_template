<template>
  <!-- svg：图标外层容器节点，需要内部与use标签结合使用 -->
  <!-- <svg>
    <use xlink:href="#icon-home" fill="green"></use>
  </svg> -->

  <div>
    <!-- <h1>111</h1> -->
    <!-- <SvgIcon name="home"></SvgIcon> -->
    <!-- <el-button @click="login">登录</el-button> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue'
import { reqLogin } from './api/user'

// function login() {
//   const data = {
//     username: 'admin',
//     password: '111111',
//   }
//   reqLogin(data).then((res) => {
//     console.log(res)
//   })
// }
</script>

<style scoped lang="scss">

</style>
