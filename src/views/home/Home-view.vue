<!--
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-01 02:19:18
 * @FilePath     : /h5-auto/src/views/home/Home-view.vue
 * @Description  : 
-->
<template>
  <div class="home-view page">
    <!-- 设备操作区 -->
    <div class="dev-tools">
      <dev-tools></dev-tools>
    </div>
    <!-- 元素操作区 -->
    <div class="element-tools">
      <element-tools></element-tools>
    </div>
    <!-- 页面操作区 -->
    <div class="page-tools">
      <page-tools></page-tools>
    </div>
  </div>
</template>

<script setup lang="ts">
import DevTools from './components/dev-tools/dev-tools.vue';
import ElementTools from './components/element-tools/element-tools.vue';
import PageTools from './components/page-tools/page-tools.vue';
</script>
<style scoped>
.home-view {
  display: flex;
}
.home-view > * {
  height: 100%;
}
.dev-tools {
  width: 480px;
}
.element-tools {
  width: 180px;
}
.page-tools {
  width: 260px;
}
</style>
