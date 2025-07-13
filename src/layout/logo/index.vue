<template>
  <div class="logo">
    <img v-if="setting.logoShow" :src="setting.logo" alt="" />
    <p :title="setting.title">{{ setting.title }}</p>
  </div>
</template>

<script lang="ts" setup>
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  img {
    height: 100%;
    object-fit: cover;
  }
  p {
    width: 100%;
    font-size: $base-menu-title-fontSize;
    color: $base-menu-title-fontColor;
    margin-left: 10px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
}
</style>
