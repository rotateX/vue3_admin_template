<template>
  <!-- 路由组件出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout 一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { useLayoutSettingStore } from '@/store/modules/setting'
import { computed, watch, ref, nextTick } from 'vue'
const layoutStore = useLayoutSettingStore()
const flag = ref(true)
watch(
  () => layoutStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
      layoutStore.refresh = false
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
