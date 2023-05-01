<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 02:26:51
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-01 14:51:57
 * @FilePath     : /h5-auto/src/views/home/components/page-tools/components/page-list/page-list.vue
 * @Description  : page-list
-->
<template>
  <div class="page-list">
    <div class="list-box" v-for="(page, index) in pageList" :key="page.id">
      <page-main :pageInfo="{ ...page, index }"></page-main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PageMain from './components/page-main.vue';
const pageList = ref([
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
  { id: '10' },
  { id: '11' },
]);
</script>
<style scoped>
.page-list {
  flex: 1;
  max-height: calc(100vh - 100px);
  overflow-x: hidden;
  overflow-y: auto;
}
.list-box {
  height: 187px;
}
.list-box + .list-box {
  border-top: 1px solid #eef2f8;
}
.list-box:nth-last-child(1) {
  border-bottom: 1px solid #eef2f8;
}
</style>
