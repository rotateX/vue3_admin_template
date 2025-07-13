<template>
  <div class="tabbar-left">
    <!-- 左侧图标 -->
    <!-- <div @click="handleFold">
      <el-icon v-show="fold"><Expand /></el-icon>
      <el-icon v-show="!fold"><Fold /></el-icon>
    </div> -->
    <el-icon @click="layoutStore.handleFold" class="flod-btn">
      <component :is="layoutStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="item.path" v-for="item in $route.matched" :key="item.path" v-show="item.meta.title">
        <div class="breadcrumb-item">
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutSettingStore } from '@/store/modules/setting'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const layoutStore = useLayoutSettingStore()
const $route = useRoute()
</script>

<style scoped lang="scss">
.tabbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 20px;
  .flod-btn {
    cursor: pointer;
  }
  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
