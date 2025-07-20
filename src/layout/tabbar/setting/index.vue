<template>
  <div class="tabbar-right">
    <el-button icon="Refresh" circle @click="refresh" />
    <el-button icon="FullScreen" circle @click="fullSreen" />
    <el-button icon="Setting" circle />
    <el-avatar :size="32" :src="userStore.userInfo?.avatar || logo" style="margin: 0 12px" />
    <!-- 下拉 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.userInfo?.name || 'default' }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo.png'
import { useLayoutSettingStore } from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const layoutStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

const refresh = () => {
  layoutStore.refresh = true
}

// 全屏
const fullSreen = () => {
  // DOM对象的一个属性 判断当前是不是全屏 全屏true
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = () => {
  userStore.userLogout().then(res => {
    // if (res === 'success') {
    // }
    $router.push({ path: '/login', query: { redirect: $route.path } })
  })
}
</script>

<style scoped lang="scss">
.tabbar-right {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
</style>
