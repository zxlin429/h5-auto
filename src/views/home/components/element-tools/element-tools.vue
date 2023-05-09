<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 22:04:53
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-09 16:13:21
 * @FilePath     : \h5-auto\src\views\home\components\element-tools\element-tools.vue
 * @Description  : 元素操作区
-->
<template>
  <div class="element-tools-control control no-select">
    <!-- 页面控制台 -->
    <phone-console></phone-console>
    <!-- 元素控制台 -->
    <element-console v-if="currentElement"></element-console>
  </div>
</template>
<script setup lang="ts">
import PhoneConsole from './components/phone-console/phone-console.vue';
import ElementConsole from './components/element-console/element-console.vue';
import useProject from '@/views/home/hooks/useProject';
import { useStore } from 'vuex';
const store = useStore();
const { currentElement } = useProject(store);
</script>
<style scoped>
.element-tools-control {
  background: rgb(31, 35, 50);
  padding: 0 15px;
  overflow-y: auto;
}
*::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
