<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-slider" :class="{ fold: layoutStore.fold }">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="layoutStore.fold"
          :default-active="$route.path"
          background-color="#001529"
          text-color="#fff"
        >
          <Menu :menuList="menu"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout-tabbar" :class="{ fold: layoutStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示 -->
    <div class="layout-main" :class="{ fold: layoutStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import { useLayoutSettingStore } from '@/store/modules/setting'
defineOptions({
  name: 'Layout',
})
const userStore = useUserStore()
const menu = userStore.menuRoutes
const $route = useRoute()
const layoutStore = useLayoutSettingStore()
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    &.fold {
      width: $base-menu-fold-width;
    }
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
      width: 100%;
      color: #fff;
      .el-menu {
        border: none;
      }
    }
    transition: all 0.5s;
  }
  .layout-tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
    transition: all 0.5s;
  }
  .layout-main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: $base-main-bg;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
    transition: all 0.5s;
  }
}
</style>
