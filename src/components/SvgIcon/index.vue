<template>
  <svg :style="`width:${width || 30}px;height:${height || 30}px`">
    <use :xlink:href="`${prefix}${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'

const props = withDefaults(
  defineProps<{
    prefix?: string
    width?: number
    height?: number
    name?: string
    color?: string
  }>(),
  {
    prefix: '#icon-',
    width: 30,
    height: 30,
    name: 'home',
    color: '',
  },
)

// defineProps({
//   prefix: {
//     type: String,
//     default: '#icon-',
//   },
//   name: {
//     type: String,
//     default: 'home',
//   },
//   color: {
//     type: String,
//     default: '',
//   },
//   height: {
//     type: Number,
//     default: 30,
//   },
//   width: {
//     type: Number,
//     default: 30,
//   },
// })
</script>
