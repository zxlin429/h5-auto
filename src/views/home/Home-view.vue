<!--
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 11:53:11
 * @FilePath     : \h5-auto\src\views\home\Home-view.vue
 * @Description  : 
-->
<template>
  <div class="home-view page">
    <!-- 设备操作区 -->
    <div class="dev-tools">
      <dev-tools></dev-tools>
    </div>
  </div>
</template>

<script setup lang="ts">
import DevTools from './components/dev-tools/dev-tools.vue';
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
</style>
