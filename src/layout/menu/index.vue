<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="item.meta.show" @click="goRoute">
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由 并且只有一个 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="item.children[0].meta?.show"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon v-if="item.children[0].meta.icon">
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="item.meta.show" :index="item.path">
        <template #title>
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归自己 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const $router = useRouter()
defineProps(['menuList'])

const goRoute = vc => {
  // console.log(vc.index)
  $router.push(vc.index)
}
</script>

<style scoped lang="scss"></style>
