<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 02:17:26
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-03 18:52:00
 * @FilePath     : /h5-auto/src/views/home/components/page-tools/page-tools.vue
 * @Description  : 页面操作区
-->
<template>
  <div class="page-tools-control control no-select">
    <project-info></project-info>
    <page-list></page-list>
    <add-page></add-page>
  </div>
</template>
<script setup lang="ts">
import ProjectInfo from './components/project-info/project-info.vue';
import PageList from './components/page-list/page-list.vue';
import AddPage from './components/add-page/add-page.vue';
</script>
<style scoped>
.page-tools-control {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
