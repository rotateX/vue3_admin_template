<template>
  <div class="tabbar">
    <Breadcrumb></Breadcrumb>
    <Setting></Setting>
  </div>
</template>

<script lang="ts" setup>
import Setting from './setting/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
</style>
